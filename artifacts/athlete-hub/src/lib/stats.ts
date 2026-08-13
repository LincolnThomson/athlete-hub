export type GameStats = {
  ppg: number;
  rpg: number;
  apg: number;
  gamesPlayed: number;
  totalPoints: number;
  totalRebounds: number;
  totalAssists: number;
};

export function calculateStats(games: any[]): GameStats {
  if (!games || games.length === 0) {
    return { ppg: 0, rpg: 0, apg: 0, gamesPlayed: 0, totalPoints: 0, totalRebounds: 0, totalAssists: 0 };
  }

  const totalPoints = games.reduce((sum, g) => sum + (g.points || 0), 0);
  const totalRebounds = games.reduce((sum, g) => sum + (g.rebounds || 0), 0);
  const totalAssists = games.reduce((sum, g) => sum + (g.assists || 0), 0);
  const gamesPlayed = games.length;

  return {
    ppg: Number((totalPoints / gamesPlayed).toFixed(1)),
    rpg: Number((totalRebounds / gamesPlayed).toFixed(1)),
    apg: Number((totalAssists / gamesPlayed).toFixed(1)),
    gamesPlayed,
    totalPoints,
    totalRebounds,
    totalAssists,
  };
}

export function calculateOVR(stats: GameStats): number {
  const baseOVR = 50;
  const ovrBoost = (stats.ppg * 2) + (stats.rpg * 1.5) + (stats.apg * 1.5);
  return Math.min(99, Math.max(0, Math.round(baseOVR + ovrBoost)));
}
