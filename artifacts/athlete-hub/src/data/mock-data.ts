export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Elite' | 'Legendary';

export const player = {
  name: 'Jordan Lincoln',
  firstName: 'Lincoln',
  username: '@jlincoln',
  position: 'PG',
  grade: 'Junior',
  team: 'Northside Wolves',
  school: 'Northside High',
  height: `6'1"`,
  bio: 'A floor general who sees the next play before it opens.',
  ovr: 78,
  level: 8,
  xp: 1240,
  xpMax: 1500,
  stars: 4,
  ppg: '14.2',
  rpg: '4.8',
  apg: '5.1',
  fg: '52%',
  games: 23,
  season: '2026',
  collectionCount: 24,
};

export const recentGame = { opponent: 'Eastview Eagles', date: 'Mar 08, 2026', result: 'W 72—64', pts: 18, reb: 7, ast: 6, stl: 2 };

export const achievements = [
  { id: 'floor-general', title: 'Floor General', copy: '10+ assists in a single game', icon: 'target', unlocked: true },
  { id: 'double-double', title: 'Double Double', copy: 'Two categories in double figures', icon: 'layers', unlocked: true },
  { id: 'iron-five', title: 'Iron Five', copy: 'Play 20 games in a season', icon: 'shield', unlocked: true },
  { id: 'clutch', title: 'Clutch Performer', copy: 'Score 10 points in the 4th quarter', icon: 'flame', unlocked: false },
];

export const cards = [
  { id: 'northside-rookie', name: 'Northside Rookie', subtitle: 'First season · 2023', rarity: 'Common' as Rarity, number: '001', accent: '#7f8da1' },
  { id: 'first-start', name: 'First Start', subtitle: 'Varsity debut · 2024', rarity: 'Rare' as Rarity, number: '014', accent: '#6fa7d8' },
  { id: 'court-vision', name: 'Court Vision', subtitle: '6 assists · Eastview', rarity: 'Epic' as Rarity, number: '026', accent: '#a98de8' },
  { id: 'all-tournament', name: 'All-Tournament', subtitle: 'Winter Classic · 2025', rarity: 'Elite' as Rarity, number: '041', accent: '#f0b84b' },
  { id: 'the-comeback', name: 'The Comeback', subtitle: 'Down 17 at half · 2026', rarity: 'Legendary' as Rarity, number: '077', accent: '#ff7d4e' },
  { id: 'steady-hand', name: 'Steady Hand', subtitle: '94% free throws · 2026', rarity: 'Rare' as Rarity, number: '032', accent: '#6fa7d8' },
];

export const leaderboard = [
  { rank: 1, name: 'Jordan M.', username: '@jordanm', position: 'SF', ovr: 92, level: 14, movement: 2, xp: '2,880', initials: 'JM' },
  { rank: 2, name: 'Marcus T.', username: '@marcust', position: 'PG', ovr: 89, level: 13, movement: -1, xp: '2,640', initials: 'MT' },
  { rank: 3, name: 'Alex R.', username: '@alexr', position: 'SG', ovr: 86, level: 11, movement: 1, xp: '2,410', initials: 'AR' },
  { rank: 4, name: 'Lincoln', username: '@jlincoln', position: 'PG', ovr: 78, level: 8, movement: 3, xp: '1,240', initials: 'JL', isCurrent: true },
  { rank: 5, name: 'Jayden K.', username: '@jaydenk', position: 'C', ovr: 77, level: 8, movement: -2, xp: '1,190', initials: 'JK' },
  { rank: 6, name: 'Noah B.', username: '@noahb', position: 'PF', ovr: 74, level: 7, movement: 1, xp: '1,050', initials: 'NB' },
];