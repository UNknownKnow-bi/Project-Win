# 事件数据结构

## 概述

《职场苏丹》采用三表设计模式管理事件数据，将事件分为三个相互关联的表：事件表(event_table)、分支表(branch_table)和槽位表(slot_table)。这种分离设计使得事件系统更易于维护和扩展。

## 三表结构

### 1. 事件表 (event_table)

存储事件的基本信息和触发条件。

```json
{
  "event_id": 10001,                   // 唯一事件ID
  "event_type": "daily",               // 事件类型: daily, random, ending 
  "event_name": "紧急部门会议",        // 事件名称
  "event_group_name": "职场挑战",      // 事件组名称
  "valid_rounds": "3-10",              // 有效回合范围
  "duration_rounds": 1,                // 持续回合数
  "icon_path": "resources/icons/meeting.png",    // 图标路径
  "background_path": "resources/backgrounds/meeting_room.jpg", // 背景图路径
  "audio_path": "resources/audio/office_talk.mp3", // 音频路径
  "prerequisite_conditions": {          // 前置条件
    "required_attributes": {            // 所需属性
      "social": 5,
      "leadership": 3
    },
    "required_items": [101, 102],       // 所需物品
    "excluded_events": [10002],         // 排除事件
    "day_type": "workday",              // 日期类型
    "round_range": [1, 7],              // 回合范围
    "chance": 0.3                       // 触发概率
  },
  "max_occurrences": 1,                 // 最大触发次数
  "cooldown": 3                         // 冷却回合数
}
```

### 2. 分支表 (branch_table)

存储各分支的叙事文本内容。

```json
{
  "event_id": 10001,                    // 对应事件ID
  "branch_id": 1,                       // 分支ID
  "pre_check_text": [                   // 检定前文本
    "部门经理环顾四周，要求各部门负责人汇报工作进展。",
    "轮到你时，你决定采用自信展示的方式，准备展示你团队的工作和成果。",
    "你拿出了{card_name}，深吸一口气，开始你的展示。"
  ],
  "success_text": [                     // 成功文本
    "你自信地展示了团队的工作和成果，数据清晰，逻辑严密。",
    "部门经理看起来很满意，其他与会者也频频点头。",
    "\"做得很好！这正是我们需要的那种清晰的思路。\"部门经理评价道。",
    "会议室的气氛变得活跃，有人甚至为你的展示鼓掌。"
  ],
  "failure_text": [                     // 失败文本
    "你尝试自信地展示团队成果，但发现自己准备不足。",
    "数据呈现混乱，你的解释也不够清晰。",
    "部门经理皱着眉头，不时打断你提问。",
    "\"看来你们部门需要更加努力，\"他最终说道，\"希望下次能看到实质性的进展。\"",
    "会议室的气氛变得沉闷，你感到一阵尴尬。"
  ]
}
```

### 3. 槽位表 (slot_table)

存储卡牌槽位和非卡牌选项的游戏机制。

```json
{
  "event_id": 10001,                    // 对应事件ID
  "slot_id": 1,                         // 槽位ID
  "slot_type": "card_slot",             // 槽位类型: card_slot, non_card_option
  "slot_description": "自信展示",       // 槽位描述
  "allowed_card_types": ["演讲", "领导力", "技术"], // 允许的卡牌类型
  "branch_id": 1,                       // 关联的分支ID
  "check_mechanism": {                  // 检定机制
    "type": "random",                   // 随机检定
    "attribute_source": "card",         // 使用卡牌属性
    "base_success_rate": 0.7,           // 基础成功率
    "card_attribute_influence": 1.5     // 卡牌属性影响系数
  },
  "success_condition_json": {           // 成功条件，仅固定检定类型使用
    "social": 8,                        // 需要社交属性≥8
    "power": 5                          // 且权力属性≥5
  },
  "success_results": {                  // 成功结果
    "attributes": {                     // 属性变化
      "reputation": 15,
      "stress": 5
    },
    "relationship": {                   // 关系变化
      "boss": 10,
      "colleague_zhang": -5
    },
    "items": [201],                     // 获得物品
    "status": ["confident"]             // 状态效果
  },
  "failure_results": {                  // 失败结果
    "attributes": {
      "reputation": -10,
      "stress": 15
    },
    "relationship": {
      "boss": -5
    }
  },
  "next_event_success": 10002,          // 成功后触发事件ID
  "next_event_delay_success": 1,        // 成功后触发延迟天数
  "next_event_failure": null,           // 失败后触发事件ID
  "next_event_delay_failure": 0,        // 失败后触发延迟天数
  "effect_modifier": {                  // 效果修正
    "social": 1.2,                      // 社交效果提升20%
    "intellect": 1.5                    // 智力效果提升50%
  },
  "required_for_completion": true,      // 是否必须完成
  "option_text_json": {                 // 选项文本，仅非卡牌选项使用
    "zh": "装作路过",
    "en": "Walk by casually"
  }
}
```

## 表间关系

三个表之间通过ID字段建立关联关系：

1. **事件ID关联**：
   - branch_table.event_id → event_table.event_id
   - slot_table.event_id → event_table.event_id

2. **分支ID关联**：
   - slot_table.branch_id → branch_table.branch_id
   
3. **事件链关联**：
   - slot_table.next_event_success/failure → event_table.event_id（其他事件）

## 非卡牌选项

非卡牌选项是一种特殊类型的槽位，不需要玩家放置卡牌即可选择：

```json
{
  "event_id": 10001,
  "slot_id": 3,
  "slot_type": "non_card_option",       // 非卡牌选项
  "slot_description": "装作路过",
  "allowed_card_types": [],             // 空数组
  "branch_id": 3,
  "check_mechanism": {
    "type": "fixed",                    // 通常使用固定检定
    "attribute_source": "player"
  },
  "success_condition_json": {
    "social": 10                        // 社交≥10才能成功
  },
  "success_results": {
    "attributes": {
      "stress": -5
    }
  },
  "failure_results": {
    "attributes": {
      "reputation": -5
    }
  },
  "option_text_json": {                 // 非卡牌选项必须提供显示文本
    "zh": "装作路过",
    "en": "Walk by casually"
  }
}
```

## 检定机制

系统支持两种检定机制：

1. **随机检定**：
```json
{
  "type": "random",
  "attribute_source": "card",          // 或 "player"
  "base_success_rate": 0.7,
  "card_attribute_influence": 1.5
}
```

2. **固定检定**：
```json
{
  "type": "fixed",
  "attribute_source": "player"
}
```

固定检定必须提供成功条件：
```json
"success_condition_json": {
  "social": 8,
  "leadership": 6
}
```

## 事件链设计

通过next_event_success和next_event_failure字段构建事件链：

```json
{
  "event_id": 10001,
  "slot_id": 1,
  // ... 其他字段 ...
  "next_event_success": 10002,         // 成功后触发事件10002
  "next_event_delay_success": 1,       // 1天后触发
  "next_event_failure": 10003,         // 失败后触发事件10003
  "next_event_delay_failure": 0        // 立即触发
}
```

## 事件结果

事件可以影响多种游戏状态：

```json
"success_results": {
  "attributes": {                       // 影响玩家属性
    "social": 2,
    "power": 1,
    "reputation": 3
  },
  "relationship": {                     // 影响关系
    "boss": 2,
    "colleague_zhang": -1
  },
  "items": [101, 102],                  // 获得物品
  "status": ["confident", "focused"],   // 添加状态
  "remove_status": ["stressed"],        // 移除状态
  "flags": {                            // 设置标记
    "met_ceo": true,
    "project_completed": true
  }
}
```

## 文本变量

分支表中的文本支持以下变量：

- `{player_name}` - 玩家名称
- `{card_name}` - 使用的卡牌名称
- `{card_value}` - 卡牌数值
- `{social}` - 玩家社交属性
- `{power}` - 玩家权力属性
- `{charm}` - 玩家魅力属性

## 本地化

非卡牌选项文本支持多语言：

```json
"option_text_json": {
  "zh": "装作路过",
  "en": "Walk by casually", 
  "ja": "何気なく通り過ぎる"
}
```

## 完整示例

参见数值表目录下的示例文件：

- `example_event_table.json` - 事件表示例
- `example_branch_table.json` - 分支表示例
- `example_slot_table.json` - 槽位表示例

## 技术实现

系统运行时将三表数据合并并转换为内部格式，通过事件管理器(EventManager)和事件解析器(EventParser)处理逻辑判断和执行。 