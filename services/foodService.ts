
import { UserPreferences, FoodItem, BudgetLevel, TimeConstraint } from "../types.ts";

const FOOD_DATABASE: FoodItem[] = [
  {
    id: '1',
    name: "街角麻辣烫",
    description: "一人食的热辣慰藉，全自由搭配。",
    reasoning: "既然时间较紧且想要高性价比，麻辣烫能快速提供热量，同时满足你对辛辣或咸鲜的渴望。",
    behavioralAdvice: "多点蔬菜和菌类，少喝汤，能有效控制热量摄入。",
    optimizationTips: "加两勺老陈醋，能瞬间提升汤底的层次感。",
    alternative: "便利店关东煮",
    budget: 'Low',
    time: 'Quick',
    moods: ['😴 疲惫', '😤 压力'],
    categories: ['快餐', '川菜']
  },
  {
    id: '2',
    name: "慢火和牛寿喜烧",
    description: "高品质牛肉与甜美汤底的优雅碰撞。",
    reasoning: "心情愉悦且时间充裕时，慢慢涮煮和牛是一种仪式感。这完全符合你对‘更优解’的追求。",
    behavioralAdvice: "第一口肉尝试不蘸蘸料，感受和牛原始的油脂香气。",
    optimizationTips: "最后剩下的汤底，加入一个可生食鸡蛋和米饭，煮成杂炊是灵魂收尾。",
    alternative: "精致日料店",
    budget: 'High',
    time: 'Leisurely',
    moods: ['🥳 兴奋', '😌 平静'],
    categories: ['日料']
  },
  {
    id: '3',
    name: "美式厚切培根堡",
    description: "汁水四溢的肉饼与焦香培根的肉欲横流。",
    reasoning: "压力大时，高蛋白和高热量是天然的减压药。汉堡的便携性也满足了快节奏的需求。",
    behavioralAdvice: "抛弃餐具，直接用手抓着吃，释放压力的第一步就是打破束缚。",
    optimizationTips: "搭配一杯零度可乐，既能获得碳酸的快感，又能稍微减轻负罪感。",
    alternative: "墨西哥卷饼",
    budget: 'Medium',
    time: 'Quick',
    moods: ['😤 压力', '🤔 纠结'],
    categories: ['快餐', '西餐']
  },
  {
    id: '4',
    name: "地中海谷物暖沙拉",
    description: "温热的烤南瓜、藜麦与低脂鸡胸肉的健康组合。",
    reasoning: "在饮食计划内寻找最优解，暖沙拉比冷沙拉更适合中国胃，且饱腹感极强。",
    behavioralAdvice: "细嚼慢咽，充分感受谷物的原始清香。",
    optimizationTips: "加一份牛油果或坚果，补充优质油脂。",
    alternative: "波奇饭 (Poke Bowl)",
    budget: 'Medium',
    time: 'Medium',
    moods: ['😌 平静', '😴 疲惫'],
    categories: ['沙拉']
  }
];

export const decideFood = async (prefs: UserPreferences): Promise<FoodItem> => {
  // 模拟 AI 思考延迟
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 1. 可行性过滤 (Hard Filter)
  let pool = FOOD_DATABASE.filter(f => f.budget === prefs.budget && f.time === prefs.time);

  // 如果硬性条件没匹配到，放宽一个维度
  if (pool.length === 0) {
    pool = FOOD_DATABASE.filter(f => f.budget === prefs.budget);
  }

  // 2. 更优解权重 (Soft Match)
  // 计算每个备选方案与心情、偏好的匹配分数
  const scoredPool = pool.map(item => {
    let score = 0;
    if (item.moods.includes(prefs.mood)) score += 3;
    prefs.preferences.forEach(p => {
      if (item.categories.includes(p)) score += 2;
    });
    return { item, score };
  });

  // 按分数排序并返回最高分（如果分数相同则随机）
  scoredPool.sort((a, b) => b.score - a.score);
  return scoredPool[0]?.item || FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
};
