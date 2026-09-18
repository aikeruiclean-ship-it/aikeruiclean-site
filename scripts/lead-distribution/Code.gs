/**
 * Aikeruiclean 客户线索自动分配系统
 * ====================================
 * 部署在 info@aikeruiclean.com 的 Google Workspace
 *
 * 功能：
 * 1. 监控 Gmail 收件箱的新邮件（网站询单 / WhatsApp转发 / 直接邮件）
 * 2. Round-Robin 轮询分配给业务员
 * 3. 自动转发给对应业务员 + 发送通知
 * 4. 记录到 Google Sheet 跟踪表
 *
 * 部署步骤：
 *   1. 打开 https://script.google.com
 *   2. 新建项目，粘贴本文件
 *   3. 运行 setupSpreadsheet_() 初始化跟踪表
 *   4. 设置触发器：processInbox → 时间驱动 → 每 5 分钟
 *   5. 授权 Gmail / Sheets / Properties 权限
 */

// ============================================================
// 配置区 ← 修改这里适配你的业务员
// ============================================================

var SALES_TEAM = [
  { name: "Jennifer", email: "jennifer@czhclean.com", phone: "18133073186" },
  { name: "Wisdom",   email: "wisdom@czhclean.com",   phone: "17352977258" },
  { name: "Keke",     email: "keke@czhclean.com",     phone: "19159116875" },
  { name: "Liv",      email: "liv@czhclean.com",       phone: "18324956076" }
];

var UNIFIED_EMAIL = "info@aikeruiclean.com";

// ============================================================
// Round-Robin 分配核心
// ============================================================

/**
 * 获取下一个应分配的业务员（轮询）
 */
function getNextAssignee_() {
  var props = PropertiesService.getScriptProperties();
  var counter = parseInt(props.getProperty("ROUND_ROBIN_COUNTER") || "0");
  var assignee = SALES_TEAM[counter % SALES_TEAM.length];
  props.setProperty("ROUND_ROBIN_COUNTER", String(counter + 1));
  return assignee;
}

/**
 * 重置计数器（管理员用）
 */
function resetCounter() {
  PropertiesService.getScriptProperties().deleteProperty("ROUND_ROBIN_COUNTER");
  Logger.log("计数器已重置");
}

// ============================================================
// 邮件处理主函数
// ============================================================

/**
 * 处理收件箱中的新线索邮件（由定时触发器调用，每 5 分钟）
 */
function processInbox() {
  // 只处理未读且未被处理过的邮件
  var label = getOrCreateLabel_("Aikerui/Processed");
  var processedIds = getProcessedIds_();

  var threads = GmailApp.getInboxThreads(0, 20);
  var processed = 0;

  for (var t = 0; t < threads.length; t++) {
    var thread = threads[t];
    var messages = thread.getMessages();

    for (var m = 0; m < messages.length; m++) {
      var msg = messages[m];
      var msgId = msg.getId();

      // 跳过已处理的、已读的、或自己发出的邮件
      if (processedIds.indexOf(msgId) !== -1) continue;
      if (msg.isUnread() === false) continue;
      if (msg.getFrom().indexOf("noreply@aikeruiclean.com") !== -1) continue;
      if (msg.getFrom().indexOf("czhclean.com") !== -1) continue;
      if (msg.getFrom() === UNIFIED_EMAIL) continue;

      // 提取线索信息
      var lead = extractLeadInfo_(msg);

      // 轮询分配
      var assignee = getNextAssignee_();

      // 转发给业务员
      forwardLead_(msg, lead, assignee);

      // 记录到 Google Sheet
      logToSheet_(lead, assignee);

      // 标记已处理
      msg.markRead();
      thread.addLabel(label);
      processedIds.push(msgId);
      processed++;
    }
  }

  // 保存已处理 ID 列表（最多保留 200 条）
  saveProcessedIds_(processedIds);

  Logger.log("本轮处理 " + processed + " 条新线索");
  return processed;
}

// ============================================================
// 线索信息提取
// ============================================================

/**
 * 从邮件中提取客户线索信息
 */
function extractLeadInfo_(message) {
  var subject = message.getSubject() || "";
  var body = message.getPlainBody() || "";
  var from = message.getFrom() || "";

  // 尝试从 Brevo 格式的邮件中提取结构化数据
  var lead = {
    name:    extractByLabel_(body, "Name", "姓名"),
    email:   extractByLabel_(body, "Email", "邮箱"),
    phone:   extractByLabel_(body, "Phone", "电话"),
    company: extractByLabel_(body, "Company", "公司"),
    country: extractByLabel_(body, "Country", "国家"),
    product: extractByLabel_(body, "Product", "产品"),
    quantity: extractByLabel_(body, "Quantity", "数量"),
    message: extractMessage_(body),
    source:  body.indexOf("[REQUEST VIDEO TOUR]") !== -1 ? "网站询单(视频看厂)" : "网站询单",
    timestamp: new Date().toISOString(),
    subject: subject
  };

  // 如果没解析出结构化数据，回退到基础信息
  if (!lead.name && !lead.email) {
    var match = from.match(/"?(.+?)"?\s*<(.+?)>/);
    lead.name = match ? match[1].trim() : from;
    lead.email = match ? match[2].trim() : from;
    lead.message = body.substring(0, 500);
    lead.source = "直接邮件/WhatsApp";
  }

  return lead;
}

/**
 * 从表格格式中提取字段值（匹配 Brevo 邮件的 HTML 表格结构）
 */
function extractByLabel_(body, labelEn, labelZh) {
  // 尝试多种匹配模式
  var patterns = [
    new RegExp(labelEn + "[\s\S]*?" + ">" + "([^<]+)", "i"),
    new RegExp(labelZh + "[\s\S]*?" + ">" + "([^<]+)"),
    new RegExp(labelEn + ":\s*(.+)$", "im"),
    new RegExp(labelZh + "：\s*(.+)$", "im")
  ];

  for (var i = 0; i < patterns.length; i++) {
    var match = body.match(patterns[i]);
    if (match) return match[1].trim();
  }
  return "";
}

/**
 * 提取客户留言内容
 */
function extractMessage_(body) {
  var lines = body.split("\n");
  var msgStart = false;
  var msgLines = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();

    // 找到 Message 字段后面的内容
    if (/Message|留言|message/i.test(line) && line.indexOf("<") === -1) {
      msgStart = true;
      continue;
    }
    if (msgStart) {
      if (/Received|timestamp|收到|时间/i.test(line)) break;
      if (line) msgLines.push(line);
    }
  }

  return msgLines.join(" ").substring(0, 500) || "（详见原文）";
}

// ============================================================
// 邮件转发
// ============================================================

/**
 * 将线索转发给指定的业务员
 */
function forwardLead_(originalMsg, lead, assignee) {
  var subject = "[新线索] " + (lead.product || "产品询价") + " — " + (lead.company || lead.name);

  var htmlBody = [
    '<div style="max-width:600px;font-family:Arial,sans-serif">',
    '<div style="background:#f97316;padding:20px;color:white;border-radius:8px 8px 0 0">',
    '<h2 style="margin:0">🔔 新客户线索 #{counter}</h2>',
    '<p style="margin:4px 0 0;opacity:0.9">' + lead.timestamp + '</p>',
    '</div>',
    '<div style="border:1px solid #e5e7eb;border-top:none;padding:20px;border-radius:0 0 8px 8px">',
    '<table style="width:100%;border-collapse:collapse">',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb;width:100px">客户姓名</td><td style="padding:6px 8px">' + escHtml_(lead.name) + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">公司</td><td style="padding:6px 8px">' + escHtml_(lead.company || "-") + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">国家</td><td style="padding:6px 8px">' + escHtml_(lead.country || "-") + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">电话</td><td style="padding:6px 8px"><a href="tel:' + lead.phone + '">' + escHtml_(lead.phone || "-") + '</a></td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">邮箱</td><td style="padding:6px 8px"><a href="mailto:' + lead.email + '">' + escHtml_(lead.email) + '</a></td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">产品</td><td style="padding:6px 8px">' + escHtml_(lead.product || "-") + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">数量</td><td style="padding:6px 8px">' + escHtml_(lead.quantity || "-") + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb；vertical-align:top">留言</td><td style="padding:6px 8px">' + escHtml_(lead.message) + '</td></tr>',
    '<tr><td style="padding:6px 8px;font-weight:bold;background:#f9fafb">来源</td><td style="padding:6px 8px">' + escHtml_(lead.source) + '</td></tr>',
    '</table>',
    '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">',
    '<p style="color:#6b7280;font-size:13px">',
    '⚠️ 请在 <strong>24小时内</strong> 回复客户。<br>',
    '回复时直接 Reply 此邮件，客户将收到你的回复。<br>',
    '跟踪表已自动更新 → <a href="' + getSheetUrl_() + '">查看跟踪表</a>',
    '</p>',
    '</div>',
    '</div>'
  ].join("\n");

  GmailApp.sendEmail(assignee.email, subject, "", {
    htmlBody: htmlBody,
    replyTo: lead.email,
    from: UNIFIED_EMAIL
  });
}

// =========================
