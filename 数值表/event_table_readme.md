# 职场苏丹游戏 - 事件表使用说明

## 概述
事件表是职场苏丹游戏中定义所有游戏事件的核心数据结构。本文档提供对事件表各字段的详细说明，以及如何正确填写这些字段来创建游戏事件。

## 文件格式
事件表采用CSV格式，可以使用Excel、Google Sheets或其他电子表格软件进行编辑。对于包含复杂数据的字段，使用JSON格式字符串。

## 字段说明

### 基础事件信息
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| event_id | 整数 | 是 | 事件唯一标识符，建议使用10000起始的数字 |
| event_type | 字符串 | 是 | 事件类型，如"日常事件"、"随机事件"、"结局事件" |
| event_name | 字符串 | 是 | 事件名称 |
| event_group_name | 字符串 | 否 | 事件所属的群组或系列名称 |
| valid_rounds | 字符串 | 是 | 事件有效的回合范围，如"1-7"表示1到7回合均有效 |
| duration_rounds | 整数 | 是 | 事件持续的回合数 |
| icon_path | 字符串 | 否 | 事件图标的资源路径 |
| background_path | 字符串 | 否 | 事件背景图的资源路径 |
| audio_path | 字符串 | 否 | 事件音效或背景音乐的资源路径 |
| tags | 字符串 | 否 | 用逗号分隔的事件标签列表，如"职场,密会,机遇" |

### 触发条件相关字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| prerequisite_conditions | JSON | 否 | 定义事件触发的前置条件 |

`prerequisite_conditions` 字段的JSON结构说明：
```json
{
  "required_attributes": {
    "social": 10,     // 需要社交属性>=10
    "resistance": 5   // 需要抗压属性>=5
  },
  "required_items": [101, 102],  // 需要持有物品ID 101和102
  "excluded_events": [10002, 10003],  // 事件10002和10003不能已触发
  "day_type": "workday",  // 只在工作日触发
  "round_range": [2, 5],  // 只在第2到第5回合触发
  "chance": 0.5  // 满足条件后有50%的触发概率
}
```

### 卡牌槽位字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| card_slots | JSON数组 | 否 | 定义事件中可放置卡牌的槽位和对应的分支结果 |

`card_slots` 字段的JSON结构说明（更新）：
```json
[
  {
    "slot_id": 1,  // 槽位ID
    "slot_description": "温和策略",  // 槽位描述
    "allowed_card_types": ["密会", "投资"],  // 允许的卡牌类型
    "branch_id": 1,  // 关联到叙事分支ID
    "success_condition": {  // 成功条件
      "social": 8  // 需要社交属性>=8才能成功
    },
    "failure_condition": {  // 失败条件
      "social": 4  // 若社交属性<=4则必定失败
    },
    "success_results": {  // 成功结果
      "attributes": {
        "social": 2,  // 社交属性+2
        "power": 1    // 权势属性+1
      },
      "relationship": {
        "boss": 2  // 与老板关系+2
      }
    },
    "failure_results": {  // 失败结果
      "relationship": {
        "boss": -1  // 与老板关系-1
      }
    },
    "next_event_success": 10002,  // 成功后触发事件10002
    "next_event_failure": 10003,  // 失败后触发事件10003
    "effect_modifier": {  // 效果修正
      "social": 1.2  // 社交效果提升20%
    },
    "required_for_completion": false  // 是否必须填充此槽位
  }
]
```

### 非卡牌选项字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| non_card_options | JSON数组 | 否 | 不需要使用卡牌的选项列表 |

`non_card_options` 字段的JSON结构说明：
```json
[
  {
    "option_id": 1,  // 选项ID
    "option_text": "装作路过",  // 选项文本
    "branch_id": 3,  // 关联到叙事分支ID
    "success_condition": {  // 成功条件
      "execution": 6  // 需要执行属性>=6才能成功
    },
    "success_results": {  // 成功结果
      "attributes": {
        "execution": 1  // 执行属性+1
      }
    },
    "failure_results": {},  // 失败结果（空表示无惩罚）
    "next_event_success": null,  // 成功后触发的下一个事件（null表示无后续事件）
    "next_event_failure": null   // 失败后触发的下一个事件
  }
]
```

### 分支叙事结构字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| narrative_branches | JSON数组 | 否 | 定义事件的叙事分支 |

`narrative_branches` 字段的JSON结构说明（更新）：
```json
[
  {
    "branch_id": 1,  // 分支ID，由card_slots直接引用
    "texts": [  // 分支文本
      "你选择了密会或投资策略",
      "凭借社交和财务资源建立关系",
      "这种温和的方法赢得了老板的好感"
    ],
    "character_reactions": {  // 角色反应
      "boss": {
        "attitude": 1,  // 态度变化
        "dialogue": "你很懂得如何维系关系，我欣赏这一点。"  // 对话
      }
    },
    "scene_changes": "会议室的气氛变得轻松友好"  // 场景变化
  }
]
```

### 事件流程控制字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| is_repeatable | 布尔值 | 是 | 事件是否可重复触发 |
| max_occurrences | 整数 | 否 | 最大触发次数 |
| cooldown | 整数 | 否 | 再次触发的冷却回合数 |
| priority | 整数 | 否 | 事件优先级，数字越大越优先 |
| is_interrupt | 布尔值 | 否 | 是否打断当前事件流程 |
| time_limit | 整数 | 否 | 玩家做选择的时间限制，单位秒 |

### 技术实现相关字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| script_path | 字符串 | 否 | 自定义脚本路径 |
| custom_ui_prefab | 字符串 | 否 | 自定义UI预制体 |
| save_flags | 字符串 | 否 | 需要保存的游戏状态标记，用逗号分隔 |
| debug_mode | 布尔值 | 否 | 是否启用调试信息 |
| version | 字符串 | 否 | 事件版本号 |

### 多语言支持字段
| 字段名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| text_key | 字符串 | 否 | 文本键值，用于多语言系统 |
| locale_data | JSON | 否 | 不同语言版本的文本 |

`locale_data` 字段的JSON结构说明：
```json
{
  "zh": {
    "title": "一个人的会议室",
    "description": "你偶然发现老板独自一人在会议室里。这可能是一个靠近他的机会，也可能是危险的。"
  },
  "en": {
    "title": "Meeting Room Encounter",
    "description": "You stumble upon your boss alone in the meeting room. This could be an opportunity to get closer, or it could be dangerous."
  }
}
```

## 使用技巧

1. **事件ID管理**：建议使用不同范围的ID区分不同类型的事件
   - 10000-19999：日常事件
   - 20000-29999：随机事件
   - 30000-39999：结局事件

2. **JSON格式验证**：在填写JSON字段时，可使用在线JSON验证工具确保格式正确

3. **条件设计**：设计触发条件时，需考虑玩家可能的属性范围和游戏进度

4. **分支平衡**：确保不同选项的风险与回报相对平衡

5. **事件链设计**：通过`next_event_success`和`next_event_failure`字段创建事件链，形成连贯的故事线

### 槽位与分支关联设计（更新）

新的设计完全由槽位决定分支逻辑，这种设计有以下优点：

1. **直接性**：玩家可以直接看到不同卡牌槽位对应的策略选择
2. **完整性**：每个槽位包含完整的成功/失败条件和结果，不再需要中间层的转换
3. **清晰度**：游戏逻辑更加清晰，卡牌槽位直接关联到特定的叙事分支和结果
4. **易实现**：简化了实现逻辑，不再需要复杂的选项→槽位→分支映射关系

#### 卡牌与非卡牌选项的区别

- **卡牌槽位(card_slots)**：需要玩家放置特定类型卡牌的选项，可以应用卡牌效果修正
- **非卡牌选项(non_card_options)**：不需要卡牌即可选择的选项，如"装作路过"、"拒绝参与"等

#### 实现示例

在"一个人的会议室"事件中：
- 温和策略槽位（接受"密会"或"投资"卡）→ 触发分支1 → 根据社交属性判定成功/失败
- 强硬策略槽位（接受"淘汰"或"挑战"卡）→ 触发分支2 → 根据权势属性判定成功/失败
- 装作路过选项（不需要卡牌）→ 触发分支3 → 根据执行属性判定成功/失败

这种设计让游戏流程更加直观，玩家可以清楚地看到每个选择的可能结果。

## 示例

参考`event_table_template.csv`中的示例数据行，了解如何正确填写各个字段。

## 注意事项

1. CSV格式中，如果字段内容包含逗号，请确保将整个字段用双引号括起来
2. JSON字段必须是有效的JSON格式，包括正确使用双引号、逗号等
3. 路径字段应使用正斜杠(/)而非反斜杠(\)，确保跨平台兼容性
4. 布尔值字段应使用`true`或`false`，不要使用其他表示方式
5. 数值型字段不应包含非数字字符（除非是范围表示，如"1-7"） 