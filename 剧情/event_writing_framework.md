# 职场苏丹 - 事件编剧框架

## 导言

本文档为《职场苏丹》游戏编剧提供一个结构化的创作框架，帮助你设计符合游戏机制的高质量事件内容。事件系统采用三表设计（事件表、分支表、槽位表），实现事件内容和游戏机制的模块化管理，便于多人协作开发和后期维护。

三表设计的核心理念：
- **事件表(event_table)**：存储事件的基本信息和触发条件
- **分支表(branch_table)**：存储各分支的叙事文本内容
- **槽位表(slot_table)**：存储卡牌槽位和非卡牌选项的游戏机制

这种设计让策划、编剧和系统设计师可以分工协作，各自专注于自己的专业领域。

## 事件创作工作流程

1. **事件概念构思**：确定事件的核心概念和目标
2. **事件基础设计**：创建事件表条目，定义基本属性和触发条件
3. **策略设计**：创建槽位表条目，设计不同策略选择的机制和结果
4. **叙事创作**：创建分支表条目，为每个策略分支编写叙事内容
5. **事件关联**：设置事件间的连接关系，创建事件链
6. **多语言准备**：添加多语言支持的文本内容
7. **平衡性检查**：确保事件设计平衡
8. **转换与集成**：将三表数据转换为游戏所需的格式

## 事件编剧模板

### 1. 事件表(event_table)模板

```
event_id: [唯一事件ID，如10001]
event_type: [事件类型，如"日常事件"/"随机事件"/"结局事件"]
event_name: [事件名称]
event_group_name: [事件组名称，可选]
valid_rounds: [有效回合范围，如"1-7"]
duration_rounds: [持续回合数]
icon_path: [图标路径]
background_path: [背景图路径]
audio_path: [音频路径]
prerequisite_conditions: [前置条件JSON]
{
  "required_attributes": {
    "social": 5,
    "resistance": 3
  },
  "required_items": [101, 102],
  "excluded_events": [10002],
  "day_type": "workday",
  "round_range": [1, 7],
  "chance": 0.3
}
max_occurrences: [最大触发次数]
cooldown: [冷却回合数]
```

### 2. 分支表(branch_table)模板

```
event_id: [对应事件ID]
branch_id: [分支ID，如1、2、3]
pre_check_text: [检定前文本，数组格式]
[
  "这是第一段检定前文本。",
  "这是第二段检定前文本，可以使用{card_name}等变量。"
]
success_text: [成功文本，数组格式]
[
  "这是第一段成功文本。",
  "这是第二段成功文本，可以包含\"NPC对话\"等内容。"
]
failure_text: [失败文本，数组格式]
[
  "这是第一段失败文本。",
  "这是第二段失败文本，描述失败后果。"
]
```

### 3. 槽位表(slot_table)模板

```
event_id: [对应事件ID]
slot_id: [槽位ID，如1、2、3]
slot_type: [槽位类型，"card_slot"或"non_card_option"]
slot_description: [槽位描述]
allowed_card_types: [允许的卡牌类型，数组]
branch_id: [关联的分支ID]
check_mechanism: [检定机制JSON]
{
  "type": "random",                   // 随机检定
  "attribute_source": "card",         // 使用卡牌属性
  "base_success_rate": 0.7,           // 基础成功率
  "card_attribute_influence": 1.5     // 卡牌属性影响系数
}
或
{
  "type": "fixed",                    // 固定检定
  "attribute_source": "player"        // 使用玩家属性
}
success_condition_json: [成功条件JSON，仅固定检定类型使用]
{
  "social": 8,                        // 需要社交属性≥8
  "power": 5                          // 且权力属性≥5
}
success_results: [成功结果JSON]
{
  "attributes": {                     // 属性变化
    "social": 2,
    "power": 1
  },
  "relationship": {                   // 关系变化
    "boss": 2
  },
  "items": [201],                     // 获得物品
  "status": ["confident"]             // 状态效果
}
failure_results: [失败结果JSON，格式同上]
next_event_success: [成功后触发事件ID]
next_event_delay_success: [成功后触发延迟天数]
next_event_failure: [失败后触发事件ID]
next_event_delay_failure: [失败后触发延迟天数]
effect_modifier: [效果修正JSON]
{
  "social": 1.2,                      // 社交效果提升20%
  "power": 1.0                        // 权力效果正常
}
required_for_completion: [是否必须完成，布尔值]
option_text_json: [选项文本JSON，仅非卡牌选项使用]
{
  "zh": "装作路过",
  "en": "Walk by casually"
}
```

## 表间关系说明

三个表之间通过ID字段建立关联关系：

1. **事件ID关联**：
   - branch_table.event_id → event_table.event_id
   - slot_table.event_id → event_table.event_id

2. **分支ID关联**：
   - slot_table.branch_id → branch_table.branch_id
   
3. **事件链关联**：
   - slot_table.next_event_success/failure → event_table.event_id（其他事件）

创建事件时需确保这些ID关联正确，不要出现孤立的分支或槽位。

## 编剧最佳实践

1. **分工合作**：
   - 系统设计师专注于event_table和slot_table的游戏机制部分
   - 编剧专注于branch_table的叙事内容部分
   - 协作确保机制和叙事的一致性

2. **保持选择有意义**：每个槽位应代表明显不同的策略方向

3. **平衡风险与回报**：高风险选项应有更高回报，低风险选项回报适中

4. **三段式叙事结构**：为每个分支创建检定前、成功和失败三段文本

5. **变量使用**：在文本中使用{card_name}等变量增加动态感

6. **事件链设计**：通过next_event字段设计连贯的故事线

7. **多语言一致性**：确保不同语言版本表达相同的意思和情感

8. **ID管理**：
   - 事件ID使用10000-19999区间
   - 分支ID和槽位ID从1开始为每个事件单独编号

## 示例：办公室会议事件

### 示例事件表条目

```json
{
  "event_id": 10001,
  "event_type": "日常事件",
  "event_name": "紧急部门会议",
  "event_group_name": "职场挑战",
  "valid_rounds": "3-10",
  "duration_rounds": 1,
  "icon_path": "resources/icons/meeting.png",
  "background_path": "resources/backgrounds/meeting_room.jpg",
  "audio_path": "resources/audio/office_talk.mp3",
  "prerequisite_conditions": {
    "required_attributes": {
      "social": 5,
      "leadership": 3
    },
    "required_items": [],
    "excluded_events": [],
    "day_type": "workday",
    "round_range": [3, 10],
    "chance": 0.4
  },
  "max_occurrences": 1,
  "cooldown": 0
}
```

### 示例分支表条目

```json
{
  "event_id": 10001,
  "branch_id": 1,
  "pre_check_text": [
    "部门经理环顾四周，要求各部门负责人汇报工作进展。",
    "轮到你时，你决定采用自信展示的方式，准备展示你团队的工作和成果。",
    "你拿出了{card_name}，深吸一口气，开始你的展示。"
  ],
  "success_text": [
    "你自信地展示了团队的工作和成果，数据清晰，逻辑严密。",
    "部门经理看起来很满意，其他与会者也频频点头。",
    "\"做得很好！这正是我们需要的那种清晰的思路。\"部门经理评价道。",
    "会议室的气氛变得活跃，有人甚至为你的展示鼓掌。"
  ],
  "failure_text": [
    "你尝试自信地展示团队成果，但发现自己准备不足。",
    "数据呈现混乱，你的解释也不够清晰。",
    "部门经理皱着眉头，不时打断你提问。",
    "\"看来你们部门需要更加努力，\"他最终说道，\"希望下次能看到实质性的进展。\"",
    "会议室的气氛变得沉闷，你感到一阵尴尬。"
  ]
}
```

### 示例槽位表条目

```json
{
  "event_id": 10001,
  "slot_id": 1,
  "slot_type": "card_slot",
  "slot_description": "自信展示",
  "allowed_card_types": ["演讲", "领导力", "技术"],
  "branch_id": 1,
  "check_mechanism": {
    "type": "random",
    "attribute_source": "card",
    "base_success_rate": 0.7,
    "card_attribute_influence": 1.5
  },
  "success_condition_json": null,
  "success_results": {
    "attributes": {
      "reputation": 15,
      "stress": 5
    },
    "relationship": {
      "boss": 10,
      "colleague_zhang": -5
    }
  },
  "failure_results": {
    "attributes": {
      "reputation": -10,
      "stress": 15
    },
    "relationship": {
      "boss": -5
    }
  },
  "next_event_success": 10002,
  "next_event_delay_success": 1,
  "next_event_failure": null,
  "next_event_delay_failure": 0,
  "effect_modifier": {
    "social": 1.2,
    "intellect": 1.5
  },
  "required_for_completion": true,
  "option_text_json": null
}
```

## 技术转化指南

将三表结构转换为游戏可使用的格式有以下几种方法：

1. **CSV/Excel 转 JSON**：
   - 使用Excel编辑三个表格
   - 使用转换工具将其转为JSON格式
   - 检查JSON格式的正确性

2. **表格模板下载**：
   - [事件表模板下载链接]
   - [分支表模板下载链接]
   - [槽位表模板下载链接]

3. **关键注意事项**：
   - 每个事件必须在三个表中都有对应条目
   - 所有JSON字段须使用双引号，无注释
   - 表间ID关联必须一致
   - 复杂字段如check_mechanism必须是有效的JSON结构

4. **验证工具**：
   - 使用提供的验证工具检查表间关联完整性
   - 检查必填字段是否完整
   - 验证JSON格式正确性 