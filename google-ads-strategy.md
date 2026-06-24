# Aikerui Google Ads 投放方案 — 配件 / 耗材

> 基于：欧美 + 中东市场 | 主推配件（刷子/胶条等耗材）| 月预算 $500-$1000

---

## 一、投放结构总览

```
预算：$500-1000/月
落地页：https://aikeruiclean.com/floor-scrubber-parts-quote
追踪：Google Tag Manager → GA4 + Google Ads Conversion Tracking
```

### Campaign 1：Disc Brushes & Squeegees（盘刷 + 胶条）— 预算 60%

> 这两个品类是最高频消耗品，客户每个月都要换。

**Ad Group 1.1：Disc Brush / 盘刷**（约 $200-300/月）

关键词：
```
+floor +scrubber +disc +brush                    # 精准匹配
+"disc brush" +"floor scrubber"                   # 短语匹配
floor scrubber brush replacement                  # 广泛匹配修饰
replacement disc brush for floor scrubber
"floor scrubber brush" manufacturer
OEM floor scrubber disc brush factory
scrubber brush China supplier
```

否定关键词（加到所有组）：
```
-home -household -domestic -toy -mini -handheld
-amazon -ebay -walmart
-price -cheap -discount -sale
-review -best -top
-diy -homemade
```

**Ad Group 1.2：Squeegee Rubber / 胶条**（约 $150-200/月）

关键词：
```
+floor +scrubber +squeegee +rubber
+scrubber +squeegee +blade +replacement
floor scrubber squeegee replacement
"squeegee rubber" "scrubber"
squeegee blade for floor scrubber
scrubber rubber blade OEM
```

**Ad Group 1.3：Roller & Side Brush / 滚刷 + 边刷**（约 $100-150/月）

关键词：
```
+floor +scrubber +roller +brush
+sweeper +side +brush
"roller brush" floor scrubber
"side brush" sweeper replacement
sweeper brush manufacturer China
road sweeper brush supplier
```

---

### Campaign 2：Pad Holders & Clutches（针盘 + 离合器）— 预算 25%

> 这些是更换频率稍低但客单价更高的配件。

**Ad Group 2.1：Pad Holder / 针盘**（约 $80-120/月）

关键词：
```
+pad +holder +floor +scrubber
+pad +driver +scrubber
"pad holder" "floor scrubber" replacement
pad driver for floor scrubber
scrubber pad holder manufacturer
```

**Ad Group 2.2：Clutch Plate / 离合器**（约 $50-80/月）

关键词：
```
+clutch +plate +scrubber
"clutch plate" "floor scrubber"
clutch plate replacement scrubber
scrubber clutch plate OEM
floor machine clutch plate
```

---

### Campaign 3：Brand-Specific Parts（品牌配件）— 预算 15%

> 打竞品品牌词 + 配件长尾，截获已有品牌但想找便宜替代品的客户。

**Ad Group 3.1：Tennant Compatible**

关键词：
```
+tennant +scrubber +parts
+tennant +brush +replacement
Tennant T7 scrubber parts
Tennant squeegee replacement
Tennant disc brush alternative
```

**Ad Group 3.2：Karcher Compatible**

关键词：
```
+karcher +scrubber +parts
+karcher +brush +replacement
Karcher BD50 parts
Karcher scrubber brush alternative
```

**Ad Group 3.3：Nilfisk Compatible**

关键词：
```
+nilfisk +scrubber +parts
+nilfisk +brush+replacement
Nilfisk SC550 parts
Nilfisk scrubber brush alternative
```

---

## 二、广告文案模板

### 标题（30字符限制，提供3个让Google轮换测试）

```
Headline 1: Floor Scrubber Parts | Factory Price
Headline 2: Disc Brushes & Squeegees | 30-50% Less
Headline 3: OEM Quality Parts | Compatible All Brands

Headline 1: Scrubber Brushes OEM | Ready Stock
Headline 2: Save 50% vs Dealer | Same Quality
Headline 3: Squeegee Rubber Replacement | Global Ship

Headline 1: Tennant Parts Alternative | Save 50%
Headline 2: Karcher Brush OEM | Factory Direct
Headline 3: Nilfisk Compatible Parts | Fast Quote
```

### 描述（90字符）

```
Description 1: Factory-direct disc brushes & squeegees. Compatible with Tennant, Nilfisk, Karcher & 20+ brands. 24h quote. Global shipping.

Description 2: Don't overpay dealer prices. Same quality brushes & rubber from the real manufacturer. 360+ parts in stock. Quote in 24h.
```

---

## 三、出价策略

| 阶段 | 策略 | 说明 |
|------|------|------|
| 第1-2周 | Maximize Clicks + $2.00 CPC上限 | 积累点击数据，观察哪些关键词有CTR |
| 第3-4周 | Manual CPC | 对CTR>3%的关键词提价，<1%的暂停 |
| 第5周+ | Target CPA（如有转化数据） | 目标CPA设为$30-50/询盘 |

**前期不出价太高**：B2B配件CPC $3-8，设$3-5 CPC上限先跑。

---

## 四、预算分配时间线

```
Week 1-2（学习期）：
  每天 $20-30 × 14天 = $280-420
  目标：收集100+点击，确认哪个广告组CTR最高

Week 3-4（优化期）：
  每天 $25-35 × 14天 = $350-490
  砍掉CTR<1%的关键词，给CTR>3%的加预算
  
Week 5+（稳定期）：
  每天 $30-40 × 30天 ≈ $900-1000/月
  至少拿到 5-10 个有效询盘/月
```

---

## 五、你要做的准备工作

### 1. Vercel 部署（必须先做）
```bash
cd aikerui-site
vercel --prod
```
确保环境变量设置：
- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
- `BREVO_API_KEY=你的key`

### 2. Google Tag Manager 配置
1. 创建GTM容器 → 获取 GTM-XXXXXXX
2. 添加 GA4 Configuration 标签
3. 添加 Google Ads Conversion Tracking 标签
4. 发布容器

### 3. Google Ads 账户准备
1. 确认账户已开通
2. 设置转化追踪（导入GTM的转化事件）
3. 准备 billing 信息

### 4. 落地页验证
部署后检查：
- `https://aikeruiclean.com/floor-scrubber-parts-quote` 能正常打开
- 表单提交后能收到邮件（测试用真实邮箱提交一次）
- GTM能检测到页面浏览和表单提交

---

## 六、效果预期（诚实版）

| 指标 | 月预估 |
|------|--------|
| 点击量 | 150-300 |
| CTR | 2-5% |
| CPC | $3-6 |
| 询盘数 | 5-15 |
| 成交率（B2B配件） | 10-20%（即1-3单/月） |

⚠️ **第一个月主要是测试和优化，不要期望立刻有订单。** 配件的好处是决策快，第二个月开始应该能看到稳定的询盘流。

---

## 七、如果效果不好怎么办（B计划）

如果在第4周还没有获得任何有效询盘：

1. **先检查落地页**：用 Hotjar 看用户行为，表单是否太长？加载速度如何？
2. **检查关键词意图**：是不是投了太多"research"类关键词？收紧为只投"buyer"意图词
3. **换落地页**：测试把流量导到 `/parts` 而不是落地页
4. **换市场**：把预算从美国转移到中东（CPC更低、竞争更少）
