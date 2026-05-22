# 飞书卡片消息格式参考

本文档描述股市情报员推送到飞书的卡片消息格式。

## 卡片消息结构

飞书卡片消息使用 `interactive` 类型，支持富文本元素：

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "卡片标题"
      },
      "template": "red"  // or purple, blue, green, orange, gray
    },
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**内容**"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "action",
        "actions": [
          {
            "tag": "button",
            "text": {
              "tag": "plain_text",
              "content": "查看详情"
            },
            "type": "primary",
            "url": "https://example.com"
          }
        ]
      }
    ]
  }
}
```

## 常见卡片模板

### 1. 每日早报卡片

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "📰 股市早报 | 2024-01-15"
      },
      "template": "blue"
    },
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**上证指数** 3150.25 (+0.45%)\n**深证成指** 10200.00 (-0.12%)\n**创业板** 2000.00 (+0.89%)"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**今日要点**\n• 央行降准0.25个百分点\n• 新能源汽车销量创新高\n• 人工智能板块持续火热"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**涨停股** 45只 | **跌停股** 8只\n**成交额** 8500亿元"
        }
      }
    ]
  }
}
```

### 2. 自选股告警卡片

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "🚨 自选股告警 | 贵州茅台"
      },
      "template": "red"
    },
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**600519 贵州茅台**\n💰 现价: ¥1850.00\n📊 涨幅: +5.23%\n📈 最高: ¥1865.00\n📉 最低: ¥1750.00"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "⚠️ **重大消息**\n茅台发布年度业绩预告，净利润同比增长15%，超出市场预期。"
        }
      },
      {
        "tag": "action",
        "actions": [
          {
            "tag": "button",
            "text": {
              "tag": "plain_text",
              "content": "查看详情"
            },
            "type": "primary",
            "url": "https://www.eastmoney.com"
          }
        ]
      }
    ]
  }
}
```

### 3. 市场快讯卡片

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "⚡ 市场快讯"
      },
      "template": "orange"
    },
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**【14:30】**\nA股三大指数集体收涨，沪指重回3200点。两市成交额突破万亿元。"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**板块动态**\n🚀 人工智能板块领涨，科大讯飞涨停\n💡 半导体板块表现强势，中芯国际涨超8%\n🛢️ 石油板块回调，中石油跌超3%"
        }
      }
    ]
  }
}
```

### 4. 涨跌停监控卡片

```json
{
  "msg_type": "interactive",
  "card": {
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "📊 涨跌停监控"
      },
      "template": "green"
    },
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**涨停股 (Top 5)**\n1. 科大讯飞 002230 +10.00%\n2. 比亚迪 002594 +10.00%\n3. 宁德时代 300750 +10.00%\n4. 中芯国际 688981 +10.00%\n5. 隆基绿能 601012 +10.00%"
        }
      },
      {
        "tag": "hr"
      },
      {
        "tag": "div",
        "text": {
          "tag": "markdown",
          "content": "**跌停股 (Top 5)**\n1. 某股票 *ST某某 -10.00%\n..."
        }
      }
    ]
  }
}
```

## 颜色模板说明

| 模板 | 适用场景 |
|------|----------|
| red | 紧急告警、下跌预警 |
| orange | 快讯、市场波动 |
| yellow | 提醒、注意事项 |
| green | 上涨、市场利好 |
| blue | 早晚报、信息汇总 |
| purple | 专题报道、特色内容 |
| gray | 普通消息、历史回顾 |

## 发送卡片消息

通过飞书 Webhook 发送：

```bash
curl -X POST "https://open.feishu.cn/open-apis/bot/v2/hook/xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "msg_type": "interactive",
    "card": { ... }
  }'
```

## 最佳实践

1. **标题简洁**：控制在20字以内
2. **关键数据突出**：价格、涨跌幅用粗体
3. **颜色匹配场景**：上涨用绿色，下跌用红色
4. **添加操作按钮**：方便用户跳转查看详情
5. **控制信息密度**：一张卡片聚焦一个主题