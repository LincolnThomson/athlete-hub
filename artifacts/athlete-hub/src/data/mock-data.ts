export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Elite' | 'Legendary';

export const player = {
  name: 'Jordan Lincoln',
  firstName: 'Lincoln',
  username: '@jlincoln',
  position: 'PG',
  grade: 'Junior',
  team: 'Northside Wolves',
  school: 'Northside High',
  ovr: 78,
  level: 8,
  xp: 1840,
  xpMax: 2500,
  stars: 4,
  ppg: '14.2',
  rpg: '4.8',
  apg: '5.1',
  games: 23,
  season: '2024 / 25',
};

export const recentGame = { opponent: 'Eastview Eagles', date: 'Nov 14, 2024', result: 'W 72—64', pts: 18, reb: 7, ast: 6, stl: 2 };

export const achievements = [
  { id: 'floor-general', title: 'Floor General', copy: '10+ assists in a single game', icon: 'target', unlocked: true },
  { id: 'double-double', title: 'Double Double', copy: 'Two categories in double figures', icon: 'layers', unlocked: true },
  { id: 'iron-five', title: 'Iron Five', copy: 'Play 20 games in a season', icon: 'shield', unlocked: true },
  { id: 'clutch', title: 'Clutch Performer', copy: 'Score 10 points in the 4th quarter', icon: 'flame', unlocked: false },
];

export const cards = [
  { id: 'northside-rookie', name: 'Northside Rookie', subtitle: 'First season · 2022', rarity: 'Common' as Rarity, number: '001', accent: '#e7ddd0' },
  { id: 'first-start', name: 'First Start', subtitle: 'Varsity debut · 2023', rarity: 'Rare' as Rarity, number: '014', accent: '#9bb7c9' },
  { id: 'court-vision', name: 'Court Vision', subtitle: '6 assists · Eastview', rarity: 'Epic' as Rarity, number: '026', accent: '#ad9ac5' },
  { id: 'all-tournament', name: 'All-Tournament', subtitle: 'Winter Classic · 2024', rarity: 'Elite' as Rarity, number: '041', accent: '#d8a954' },
  { id: 'the-comeback', name: 'The Comeback', subtitle: 'Down 17 at half · 2024', rarity: 'Legendary' as Rarity, number: '077', accent: '#e77149' },
  { id: 'steady-hand', name: 'Steady Hand', subtitle: '94% free throws · 2024', rarity: 'Rare' as Rarity, number: '032', accent: '#9bb7c9' },
];