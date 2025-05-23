# 事件检定机制说明

## 抽卡检定机制

我们的事件检定支持单属性和多属性两种模式：

### 单属性检定

1. **属性累加**：累加所有卡槽中卡牌的指定属性（如社交属性）
2. **抽卡数量确定**：抽卡数量等于累加的属性总和
3. **成功卡数量计算**：成功卡数量 = 属性总和 - 门槛值
4. **检定执行**：随机抽取指定数量的卡牌
5. **结果判定**：如果抽到至少所需数量的成功卡，则检定成功

### 多属性检定

1. **多属性累加**：累加所有卡槽中卡牌的多种属性（如社交、知识、权力）
2. **总属性计算**：计算所有相关属性的总和
3. **抽卡数量确定**：抽卡数量等于属性总和
4. **成功卡数量计算**：成功卡数量 = 属性总和 - 门槛值
5. **检定执行与结果判定**：与单属性检定相同

### 示例1：单属性检定

假设：
- 玩家在slot1放置了一张社交属性为3的卡牌
- 玩家在slot4放置了一张社交属性为2的卡牌
- 事件检定要求社交属性门槛为2
- 所需成功数为1

计算过程：
- 社交属性总和 = 3 + 2 = 5
- 抽卡数量 = 5
- 成功卡数量 = 5 - 2 = 3（失败卡数量为2）
- 从5张卡中随机抽取1张
- 如果抽到了成功卡（3/5的概率），则检定成功

### 示例2：多属性检定

假设：
- 玩家在slot1放置了一张卡牌（社交=3，知识=1）
- 玩家在slot4放置了一张卡牌（社交=1，知识=2，权力=1）
- 事件检定涉及三种属性（社交、知识、权力）
- 门槛值为5
- 所需成功数为1

计算过程：
- 社交属性总和 = 3 + 1 = 4
- 知识属性总和 = 1 + 2 = 3
- 权力属性总和 = 0 + 1 = 1
- 属性总和 = 4 + 3 + 1 = 8
- 抽卡数量 = 8
- 成功卡数量 = 8 - 5 = 3（失败卡数量为5）
- 从8张卡中随机抽取1张
- 如果抽到了成功卡（3/8的概率），则检定成功

## 特殊情况处理

1. **属性总和等于门槛值**：
   - 成功卡数量 = 0，失败卡数量 = 属性总和
   - 检定必然失败

2. **属性总和小于门槛值**：
   - 成功卡数量 = 0，失败卡数量 = 属性总和
   - 检定必然失败

3. **属性总和为0**：
   - 设定最小抽卡数量为1
   - 成功卡数量 = 0，失败卡数量 = 1
   - 检定必然失败 