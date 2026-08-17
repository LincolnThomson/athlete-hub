export type CardRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type PlayerCard = {
  id: string;
  userId: string;
  number: string;
  title: string;
  rarity: CardRarity;
  description: string;
  createdAt: string;
};
export const RARITY_COLORS: Record<CardRarity, string> = {
  Common: 'text-slate-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-yellow-400',
};
export function generateCardFromMilestone(userId: string, milestone: string, gameData?: any): PlayerCard {
  const rarityMap: Record<string, CardRarity> = {
    'first-game': 'Common',
    'first-20': 'Rare',
    'triple-double': 'Epic',
    'on-a-roll': 'Rare',
    'perfect-ft': 'Epic',
  };
  return {
    id: `card-${Date.now()}`,
    userId,
    number: String(Math.floor(Math.random() * 999)),
    title: milestone,
    rarity: rarityMap[milestone] || 'Common',
    description: `Unlocked: ${milestone}`,
    createdAt: new Date().toISOString(),
  };
}
