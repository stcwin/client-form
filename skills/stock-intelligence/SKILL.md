---
name: stock-intelligence
description: 监控A股市场重要消息，自选股新闻，当有重大消息时推送到飞书。触发场景：主人要求查看股市消息、每日早报、市场重大事件告警、自选股新闻监控。
---

# 股市情报员

监控A股市场重要新闻和消息，支持每日早晚报推送到飞书，以及自选股新闻监控和告警。

## 功能概览

- **市场新闻监控**：获取东方财富、同花顺等平台的A股重要新闻
- **每日早晚报**：每天定时推送市场概况到飞书
- **自选股新闻**：监控用户关注股票的最新消息
- **重大事件告警**：市场重大变化时主动推送飞书卡片消息

## 使用方式

直接问我：
- "今天股市有什么重要消息？"
- "帮我看看茅台有什么新闻"
- "给我一份今日早报"
- "监控一下自选股"

## 新闻获取

使用 `scripts/news_monitor.py` 获取财经新闻：

```bash
node scripts/news_monitor.js --type all          # 获取全部类型新闻
node scripts/news_monitor.js --type market      # 市场动态
node scripts/news_monitor.js --type policy      # 政策消息
node scripts/news_monitor.js --type sector      # 行业板块
node scripts/news_monitor.js --type stock       # 个股新闻
node scripts/news_monitor.js --stock 600519     # 茅台相关新闻
```

## 飞书卡片消息

推送格式参考 `references/feishu_alert.md`。

卡片元素包含：
- 标题和副标题
- 涨跌状态指示
- 关键数据（价格、涨跌幅、成交量）
- 操作按钮

## 消息类型

| 类型 | 说明 |
|------|------|
| market | 市场整体动态 |
| policy | 政策相关消息 |
| sector | 行业板块热点 |
| stock | 个股重大公告 |
| alert | 紧急告警（需要飞书推送）|

## 数据来源

- 东方财富（eastmoney.com）
- 同花顺（10jqka.com.cn）
- 新浪财经（finance.sina.com.cn）