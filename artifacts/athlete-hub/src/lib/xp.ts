export const XP_PER_POINT = 10;
export const XP_PER_REBOUND = 15;
export const XP_PER_ASSIST = 20;
export const XP_PER_GAME = 50;
export const XP_PER_LEVEL = 500;

export function calculateXPFromGame(game: any): number {
  const pointsXP = (game.points || 0) * XP_PER_POINT;
  const reboundXP = (game.rebounds || 0) * XP_PER_REBOUND;
  const assistXP = (game.assists || 0) * XP_PER_ASSIST;
  const gameXP = XP_PER_GAME;
  return pointsXP + reboundXP + assistXP + gameXP;
}

export function calculateLevel(totalXP: number): { level: number; xpToNextLevel: number; xpInCurrentLevel: number } {
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpForCurrentLevel = (level - 1) * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpToNextLevel = XP_PER_LEVEL - xpInCurrentLevel;
  return { level, xpToNextLevel, xpInCurrentLevel };
}
