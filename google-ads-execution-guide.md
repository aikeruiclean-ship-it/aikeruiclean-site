# Google Ads 执行手册 — 今天完成

## 你需要打开的网页（一次性全部打开）

```
① https://tagmanager.google.com          — GTM
② https://analytics.google.com           — GA4
③ https://ads.google.com                 — Google Ads
④ https://vercel.com/aikeruiclean        — Vercel
⑤ https://aikeruiclean.com/floor-scrubber-parts-quote — 落地页对照
```

---

## 第 1 步：创建 GTM 容器（5 分钟）

1. 打开 ① https://tagmanager.google.com → 登录 `aikeruiclean@gmail.com`
2. 点击右上 **Create Account**
   - Account Name: `Aikerui`
   - Country: `China`
   - Container name: `aikeruiclean.com`
   - Target: **Web**
3. 点击 **Create** → 同意条款
4. 弹窗显示的 `GTM-XXXXXXX` — **复制下来**

---

## 第 2 步：在 GA4 创建数据流（3 分钟）

1. 打开 ② https://analytics.google.com → 登录同一个 Google 账号
2. 左下角 ⚙️ Admin → **Create** → **Account**
   - Account name: `Aikerui`
3. 创建 Property → Property name: `aikeruiclean.com`
   - Time zone: `China Standard Time`
   - Currency: `USD`
4. 点击 **Web** → 填入 `https://aikeruiclean.com`
   - Stream name: `Aikerui Website`
5. 创建后会显示 **Measurement ID: `G-XXXXXXXXXX`** → **复制下来**

---

## 第 3 步：GTM 添加 GA4 标签（3 分钟）

1. 回到 GTM → 左侧 **Tags** → **New**
2. Tag Configuration → 选择 **Google Analytics** → **Google Tag**
3. Tag ID 填入第 2 步的 `G-XXXXXXXXXX`
4. Triggering → 选择 **All Pages**
5. 命名为 `GA4 - Page View` → **Save**

---

## 第 4 步：GTM 添加 Google Ads 转化标签（5 分钟）

1. 打开 ③ https://ads.google.com → 登录
2. 右上角 Tools → **Conversions** → **+ New conversion action**
3. 选择 **Website** →
   - Domain: `aikeruiclean.com`
   - 选 **Manual setup**
4. Category: **Lead** → Conversion name: `Parts Quote Submit`
   - Value: **Don't use a value**
   - Count: **One**
5. 点击 **Create and Continue** →
   - 选择 **Use Google Tag Manager**
   - 复制 **Conversion ID**（格式：`AW-XXXXXXXX`）
   - 复制 **Conversion Label**（格式：`XXXXXXXXXXX`）

回到 GTM：
6. Tags → **New** → **Google Ads Conversion Tracking**
7. 填入 Conversion ID + Conversion Label
8. Triggering → 新建：
   - 类型: **Custom Event**
   - Event name: `form_submit`
   - 命名: `Form Submit Trigger`
9. 命名这个标签: `Ads - Parts Quote Conversion` → **Save**

---

## 第 5 步：发布 GTM（1 分钟）

1. GTM 右上角 **Submit**
2. Version name: `v1 - GA4 + Ads Conversion`
3. **Publish**

---

## 第 6 步：Vercel 配置环境变量（2 分钟）

1. 打开 ④ https://vercel.com → 进入 `aikeruiclean` 项目
2. **Settings** → **Environment Variables**
3. 添加：
   ```
   Name:  NEXT_PUBLIC_GTM_ID
   Value: GTM-XXXXXXX  （第 1 步复制的）
   ```
4. 勾选 Production → **Save**
5. **Deployments** → 最新部署右边 `...` → **Redeploy** → 确认

---

## 第 7 步：创建 Google Ads 广告（15 分钟）

### Campaign 1：Disc Brush & Squeegee — 日预算 $20

1. Google Ads → **+ New Campaign** → **Search**
2. Goal: **Leads** → 选择你的转化动作 `Parts Quote Submit`
3. Campaign name: `Parts - Brushes & Squeegees`
4. Budget: **$20/day**
5. Bidding: **Maximize clicks** → Max CPC bid limit: **$4**

**Ad Group 1：Disc Brush**
```
Keywords（用括号精确匹配）:
[floor scrubber disc brush]
[scrubber disc brush replacement]
[floor scrubber brush OEM]
[replacement disc brush scrubber]

Headline 1: Floor Scrubber Disc Brushes
Headline 2: OEM Quality | 30-50% Less
Headline 3: 98 Models in Stock | 24h Quote

Description 1: Factory-direct disc brushes compatible with Tennant, Nilfisk, Karcher & 20+ brands. Same quality as dealer — half the price. Quote within 24 hours.
Description 2: Don't overpay for replacement brushes. We manufacture them. Ready stock, global shipping. WhatsApp +86 199 6523 6428.

Final URL: https://aikeruiclean.com/floor-scrubber-parts-quote
```

**Ad Group 2：Squeegee Rubber**
```
Keywords:
[floor scrubber squeegee]
[squeegee rubber replacement]
[scrubber rubber blade]
[scrubber squeegee OEM]

Headline 1: Scrubber Squeegee Rubber
Headline 2: OEM Specs | 55% Less
Headline 3: Front & Rear Blades in Stock

Description 1: Replacement squeegee rubber for all major brands. Factory-direct pricing saves you 55% vs dealer. 33 models in stock. Fast global shipping.
Description 2: Worn squeegee leaving puddles? Order replacement blades from the manufacturer. Same-day dispatch. 24h quote response.

Final URL: https://aikeruiclean.com/floor-scrubber-parts-quote
```

### Campaign 2：Pad Holders & Clutches — 日预算 $10

```
Campaign name: Parts - Pad Holders & Clutches
Budget: $10/day
Max CPC: $3

Ad Group: Pad Holder
Keywords:
[pad holder floor scrubber]
[scrubber pad driver]
[floor scrubber pad holder OEM]

Headline 1: Scrubber Pad Holders OEM
Headline 2: Factory Price | Ready Stock
Headline 3: Compatible All Major Brands

Description 1: Replacement pad holders & drivers for walk-behind and ride-on scrubbers. 28 models. Factory-direct quality. Quote in 24h.

Final URL: https://aikeruiclean.com/floor-scrubber-parts-quote
```

### Campaign 3：Brand Parts — 日预算 $5

```
Campaign name: Parts - Brand Specific
Budget: $5/day
Max CPC: $3

Ad Group 1: Tennant
Keywords:
[tennant scrubber parts]
[tennant brush replacement]
[tennant squeegee alternative]

Headline 1: Tennant Scrubber Parts | 50% Less
Headline 2: OEM Quality | Direct Factory
Headline 3: T7/T12/T17 Parts in Stock

Description 1: Compatible Tennant scrubber parts from the manufacturer. Same specs, half the dealer price. Disc brushes, squeegees, pad holders. 24h quote.

Final URL: https://aikeruiclean.com/floor-scrubber-parts-quote

---

Ad Group 2: Karcher + Nilfisk
Keywords:
[karcher scrubber parts]
[karcher brush OEM]
[nilfisk scrubber parts]
[nilfisk brush replacement]

Headline 1: Karcher & Nilfisk Parts | 50% Off
Headline 2: OEM Brush & Squeegee | Factory
Headline 3: BD50 / SC550 Parts in Stock

Description 1: Compatible Karcher BD50 & Nilfisk SC550 parts from the real manufacturer. Same quality as original — 50% less. Quote within 24h.

Final URL: https://aikeruiclean.com/floor-scrubber-parts-quote
```

---

## 第 8 步：设置否定关键词（所有 Campaign 共用）

在 Google Ads → Tools → **Negative keyword lists** → 新建：

```
home
household
domestic
toy
mini
handheld
amazon
ebay
walmart
diy
homemade
used
second hand
manual
broom
mop
vacuum
carpet
pressure washer
steam cleaner
```

---

## 验证清单

部署完成后逐一检查：

| 检查项 | 怎么做 |
|--------|--------|
| ✅ 落地页打开 | 浏览器访问 aikeruiclean.com/floor-scrubber-parts-quote |
| ✅ GTM 加载 | F12 → Console → 输入 `dataLayer` → 有输出 |
| ✅ 表单提交 | 填真实邮箱提交一次 → 收到 Brevo 邮件 |
| ✅ GA4 实时 | GA4 → Reports → Realtime → 看到自己的访问 |
| ✅ Ads 转化 | 提交表单后 → GTM Preview 看到 form_submit 事件触发 |

---

## 预期效果

| 指标 | 第 1 个月 |
|------|----------|
| 日预算 | $35 |
| 月预算 | ~$1,050 |
| 月点击 | 200-350 |
| 月询盘 | 8-20 |
| CPC | $3-5 |

第 1 周是学习期，数据会波动。第 2 周开始优化关键词和出价。
