export type Achievement = {
  id: string;
  title: string;
  description: string;
  condition: (games: any[], stats: any) => boolean;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-game',
    title: 'First Game',
    description: 'Log your first game',
    condition: (games) => games.length >= 1,
    icon: '🏀',
  },
  {
    id: 'first-20',
    title: '20-Point Game',
    description: 'Score 20+ points in a single game',
    condition: (games) => games.some((g) => g.points >= 20),
    icon: '🔥',
  },
  {
    id: 'triple-double',
    title: 'Triple Double',
    description: 'Record 10+ in three stat categories in one game',
    condition: (games) => games.some((g) => {
      const stats = [g.points, g.rebounds, g.assists].filter((s) => s >= 10);
      return stats.length >= 3;
    }),
    icon: '⭐',
  },
  {
    id: 'five-games',
    title: 'On a Roll',
    description: 'Log 5 games',
    condition: (games) => games.length >= 5,
    icon: '💪',
  },
  {
    id: 'perfect-ft',
    title: 'Perfect Game',
    description: 'Zero turnovers in a game',
    condition: (games) => games.some((g) => g.turnovers === 0),
    icon: '✨',
  },
];

export function checkAchievements(games: any[], stats: any): string[] {
  return ACHIEVEMENTS.filter((ach) => ach.condition(games, stats)).map((ach) => ach.id);
}
