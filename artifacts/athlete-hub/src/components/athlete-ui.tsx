import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowDown, ArrowRight, ArrowUp, Award, BarChart3, Boxes, ChartNoAxesColumnIncreasing, ChevronRight, CircleUserRound, Crown, Flame, Gamepad2, Gem, Home, Layers3, LockKeyhole, Medal, Menu, Minus, MoreHorizontal, PackageOpen, Shield, Sparkles, Target, Trophy, UserRound, UsersRound, X } from 'lucide-react';
import { useState } from 'react';
import { leaderboard, player, type Rarity } from '@/data/mock-data';
import { getPreviewPlan, proFeatures, proPricing, setPreviewPlan, type Plan } from '@/lib/feature-gates';

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`flex items-center gap-2.5 ${light ? 'text-[#f8f2e9]' : 'text-[hsl(var(--foreground))]'}`} data-testid="link-brand">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[3px_3px_0_hsl(var(--secondary))]"><span className="font-display text-xl font-black">A</span></span>
    <span className="font-display text-2xl font-extrabold tracking-tight">ATHLETE<span className="text-[hsl(var(--primary))]">/</span>HUB</span>
  </Link>;
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'dark' | 'ghost' | 'outline'; children: ReactNode }) {
  const styles = {
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[3px_3px_0_hsl(var(--secondary))] hover:-translate-y-0.5',
    dark: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-[3px_3px_0_hsl(var(--primary))] hover:-translate-y-0.5',
    ghost: 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]',
    outline: 'border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]',
  };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-transform duration-200 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Games', icon: Gamepad2 },
  { href: '/dashboard', label: 'Stats', icon: ChartNoAxesColumnIncreasing },
  { href: '/leaderboard', label: 'Leaderboard', icon: UsersRound },
  { href: '/collection', label: 'Collection', icon: Boxes },
  { href: '/profile', label: 'Profile', icon: CircleUserRound },
];
const mobilePrimaryItems = navItems.filter(item => ['Home', 'Leaderboard', 'Collection', 'Profile'].includes(item.label));
const mobileSecondaryItems = navItems.filter(item => ['Games', 'Stats'].includes(item.label));

function isActiveNav(label: string, location: string) {
  if (label === 'Home' || label === 'Games' || label === 'Stats') return location === '/dashboard';
  if (label === 'Leaderboard') return location === '/leaderboard';
  if (label === 'Collection') return location === '/collection';
  return location === '/profile';
}

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  return <>
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] px-5 py-7 text-[hsl(var(--sidebar-foreground))] lg:flex">
      <Brand light />
      <div className="mt-12 flex flex-1 flex-col gap-2">
        <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[.22em] text-[hsl(var(--sidebar-foreground))]/45">My hub</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActiveNav(label, location);
          return <Link key={label} href={href} className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition-colors ${active ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'text-[hsl(var(--sidebar-foreground))]/65 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]'}`} data-testid={`link-nav-${label.toLowerCase()}`}>
            <Icon size={18} strokeWidth={active ? 2.5 : 1.8} /><span>{label}</span>{active && <ChevronRight size={15} className="ml-auto" />}
          </Link>;
        })}
      </div>
      <div className="rounded-xl border border-[hsl(var(--sidebar-border))] p-3">
        <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--accent))] text-xs font-black text-[hsl(var(--accent-foreground))]">JL</div><div><p className="text-xs font-bold">{player.firstName}</p><p className="font-mono text-[9px] text-[hsl(var(--sidebar-foreground))]/45">LEVEL {player.level}</p></div></div>
      </div>
    </aside>
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 px-5 py-4 backdrop-blur lg:hidden">
      <Brand /><button className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]" onClick={() => setOpen(!open)} aria-label="Toggle navigation" data-testid="button-toggle-nav">{open ? <X size={22} /> : <Menu size={22} />}</button>
       {open && <div className="absolute left-0 right-0 top-full border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-lg">
         {navItems.map(({ href, label, icon: Icon }) => <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold ${isActiveNav(label, location) ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : ''}`} data-testid={`link-mobile-nav-${label.toLowerCase()}`}><Icon size={18} />{label}</Link>)}
      </div>}
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-center justify-around border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 px-2 backdrop-blur lg:hidden">
       {mobilePrimaryItems.map(({ href, label, icon: Icon }) => <Link key={label} href={href} className={`flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-bold ${isActiveNav(label, location) ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`} data-testid={`link-bottom-nav-${label.toLowerCase()}`}><Icon size={19} /><span>{label}</span></Link>)}
       <button type="button" onClick={() => setMoreOpen(!moreOpen)} className={`flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-bold ${moreOpen || mobileSecondaryItems.some(item => isActiveNav(item.label, location)) ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`} aria-label="Open more navigation" data-testid="button-more-navigation"><MoreHorizontal size={19} /><span>More</span></button>
       {moreOpen && <div className="absolute bottom-[76px] right-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2 shadow-2xl">
         {mobileSecondaryItems.map(({ href, label, icon: Icon }) => <Link key={label} href={href} onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold hover:bg-[hsl(var(--muted))]" data-testid={`link-more-nav-${label.toLowerCase()}`}><Icon size={17} />{label}</Link>)}
       </div>}
    </nav>
  </>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="site-noise min-h-[100dvh] bg-[hsl(var(--background))]"><Navigation /><main className="pb-24 lg:ml-64 lg:pb-0">{children}</main></div>;
}

export function PlayerCard({ compact = false, rarity = 'Elite' }: { compact?: boolean; rarity?: Rarity }) {
  return <div className={`card-shine card-tilt relative overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] p-1 text-[hsl(var(--secondary-foreground))] ${compact ? 'w-[180px]' : 'w-full max-w-[310px]'}`} data-testid="card-player">
    <div className={`relative overflow-hidden rounded-xl border border-white/15 bg-[linear-gradient(145deg,#17344d,#111b2d_62%,#261c45)] ${compact ? 'h-[248px]' : 'aspect-[.72]'}`}>
      <div className="absolute inset-0 court-lines opacity-25" />
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[2px] border-[hsl(var(--primary))]/25" /><div className="absolute -right-2 top-7 h-24 w-24 rounded-full border border-[hsl(var(--secondary-accent))]/35" />
      <div className="absolute left-4 top-4 z-10 flex items-start justify-between right-4"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/45">ATHLETE HUB · 001</p><p className="font-display text-xl font-bold tracking-wide">PLAYER CARD</p></div><span className="rounded border border-[hsl(var(--accent))]/60 bg-[hsl(var(--accent))]/15 px-2 py-1 font-mono text-[10px] font-bold text-[hsl(var(--accent))]">{player.position}</span></div>
      <div className="absolute bottom-[28%] left-1/2 z-10 -translate-x-1/2"><div className={`relative flex items-center justify-center rounded-full bg-[#dba883] shadow-[0_12px_20px_rgba(0,0,0,.35)] ${compact ? 'h-20 w-20' : 'h-28 w-28'}`}><UserRound size={compact ? 58 : 82} className="mt-5 text-[#203b4e]" strokeWidth={1.2} /></div><div className="absolute -bottom-2 left-1/2 h-14 w-28 -translate-x-1/2 rounded-t-[55px] bg-[hsl(var(--primary))]" /></div>
      <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/45">NORTHSIDE WOLVES</p><h3 className={`font-display font-black uppercase leading-none ${compact ? 'text-2xl' : 'text-4xl'}`}>{player.firstName}</h3><p className="mt-1 text-xs text-white/65">{player.grade} · SEASON {player.season}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--accent))]">★★★★ EST. · {rarity}</p></div><div className="text-right"><p className="font-mono text-[9px] text-white/55">OVR</p><p className={`animate-number font-display font-black leading-none text-[hsl(var(--accent))] ${compact ? 'text-4xl' : 'text-6xl'}`}>{player.ovr}</p></div></div>
    </div>
  </div>;
}

export function StatCard({ label, value, sub, icon: Icon = BarChart3 }: { label: string; value: string; sub?: string; icon?: typeof BarChart3 }) {
  return <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4" data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-center justify-between text-[hsl(var(--muted-foreground))]"><span className="font-mono text-[10px] uppercase tracking-[.16em]">{label}</span><Icon size={16} /></div><p className="mt-3 font-display text-4xl font-black">{value}</p>{sub && <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{sub}</p>}</div>;
}

export function XPProgress() {
  const percent = (player.xp / player.xpMax) * 100;
  return <div data-testid="progress-xp"><div className="mb-2 flex items-end justify-between"><div><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">Season XP</span><p className="font-display text-2xl font-bold">Level {player.level}</p></div><span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">{player.xp.toLocaleString()} / {player.xpMax.toLocaleString()}</span></div><div className="h-3 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="animate-progress h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${percent}%` }} /></div><p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">{player.xpMax - player.xp} XP to Level {player.level + 1}</p></div>;
}

export function AchievementCard({ item }: { item: { id: string; title: string; copy: string; icon: string; unlocked: boolean } }) {
  const icons = { target: Target, layers: Layers3, shield: Shield, flame: Flame };
  const Icon = icons[item.icon as keyof typeof icons] || Award;
  return <div className={`flex items-center gap-3 rounded-xl border p-3 ${item.unlocked ? 'border-[hsl(var(--border))] bg-[hsl(var(--card))]' : 'border-dashed border-[hsl(var(--border))] opacity-50'}`} data-testid={`achievement-${item.id}`}><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${item.unlocked ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' : 'bg-[hsl(var(--muted))]'}`}><Icon size={19} /></div><div className="min-w-0"><p className="font-bold">{item.title}</p><p className="truncate text-xs text-[hsl(var(--muted-foreground))]">{item.copy}</p></div>{item.unlocked && <Trophy size={15} className="ml-auto text-[hsl(var(--primary))]" />}
  </div>;
}

export function CollectionCard({ card }: { card: { id: string; name: string; subtitle: string; rarity: Rarity; number: string; accent: string } }) {
  const rarityClass: Record<Rarity, string> = { Common: 'rarity-common', Rare: 'rarity-rare', Epic: 'rarity-epic', Elite: 'rarity-elite', Legendary: 'rarity-legendary' };
  return <article className={`card-shine group relative overflow-hidden rounded-xl border bg-[hsl(var(--card))] p-2 transition-transform duration-300 hover:-translate-y-1 ${rarityClass[card.rarity]}`} style={{ borderColor: 'hsl(var(--rarity-color) / .65)' }} data-testid={`collection-card-${card.id}`}><div className="relative aspect-[.78] overflow-hidden rounded-lg bg-[linear-gradient(145deg,#17344d,#111827)]"><div className="absolute inset-0 court-lines opacity-25" /><div className="absolute inset-x-3 top-3 flex justify-between font-mono text-[8px] text-white/60"><span>AH / {card.number}</span><span>{card.rarity}</span></div><div className="absolute left-1/2 top-[38%] -translate-x-1/2"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dba883]"><UserRound size={48} className="mt-3 text-[#203b4e]" strokeWidth={1} /></div><div className="mx-auto h-11 w-20 rounded-t-full bg-[hsl(var(--primary))]" /></div><Sparkles className="absolute bottom-3 right-3 text-white/25" size={26} /></div><div className="px-1 pb-1 pt-2"><div className="flex items-center justify-between gap-2"><p className="font-display text-lg font-bold uppercase leading-none text-[hsl(var(--foreground))]">{card.name}</p><span className="font-mono text-[9px] font-bold uppercase" style={{ color: 'hsl(var(--rarity-color))' }}>{card.rarity}</span></div><p className="mt-1 truncate text-[10px] text-[hsl(var(--muted-foreground))]">{card.subtitle}</p></div></article>;
}

export function LeaderboardRow({ entry }: { entry: (typeof leaderboard)[number] }) {
  const rankTone = entry.rank === 1 ? 'border-[hsl(var(--accent))]/50 bg-[hsl(var(--accent))]/10' : entry.rank === 2 ? 'border-slate-300/30 bg-slate-300/5' : entry.rank === 3 ? 'border-orange-300/30 bg-orange-300/5' : entry.isCurrent ? 'border-[hsl(var(--primary))]/60 bg-[hsl(var(--primary))]/10' : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]';
  const RankIcon = entry.rank === 1 ? Crown : entry.rank === 2 ? Medal : entry.rank === 3 ? Medal : null;
  return <div className={`flex items-center gap-3 rounded-xl border p-3 transition-transform hover:-translate-y-0.5 sm:gap-4 sm:p-4 ${rankTone}`} data-testid={`leaderboard-row-${entry.rank}`}>
    <div className="grid w-8 place-items-center font-display text-2xl font-black text-[hsl(var(--muted-foreground))]">{RankIcon ? <RankIcon size={20} className={entry.rank === 1 ? 'text-[hsl(var(--accent))]' : entry.rank === 2 ? 'text-slate-300' : 'text-orange-300'} /> : `#${entry.rank}`}</div>
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(145deg,hsl(var(--primary)/.8),hsl(var(--secondary-accent)/.8))] text-xs font-black text-[hsl(var(--primary-foreground))]">{entry.initials}</div>
    <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate font-bold">{entry.name}</p>{entry.isCurrent && <span className="rounded-full bg-[hsl(var(--primary))] px-2 py-0.5 font-mono text-[8px] font-bold uppercase text-[hsl(var(--primary-foreground))]">You</span>}</div><p className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{entry.position} · Level {entry.level}</p></div>
    <div className="hidden text-right sm:block"><p className="font-mono text-[9px] uppercase text-[hsl(var(--muted-foreground))]">XP</p><p className="text-xs font-bold">{entry.xp}</p></div>
    <div className="text-right"><p className="font-display text-3xl font-black leading-none text-[hsl(var(--accent))]">{entry.ovr}</p><p className="font-mono text-[8px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">OVR</p></div>
    <div className={`hidden w-7 items-center justify-end sm:flex ${entry.movement > 0 ? 'text-[hsl(var(--success))]' : entry.movement < 0 ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--muted-foreground))]'}`}>{entry.movement > 0 ? <ArrowUp size={14} /> : entry.movement < 0 ? <ArrowDown size={14} /> : <Minus size={14} />}<span className="font-mono text-[9px]">{Math.abs(entry.movement)}</span></div>
  </div>;
}

export function PackPreview() {
  const [opened, setOpened] = useState(false);
  return <div className="surface-elevated relative overflow-hidden rounded-2xl border border-[hsl(var(--secondary-accent))]/30 p-5 sm:p-7" data-testid="card-pack-preview"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[hsl(var(--secondary-accent))]/15 blur-3xl" /><div className="relative flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[hsl(var(--secondary-accent))]">Preview experience</p><h3 className="mt-2 font-display text-4xl font-black uppercase">Athlete pack</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">A future reward reveal for the moments you earn. No purchases, no transactions — just a visual preview.</p></div><PackageOpen className="text-[hsl(var(--secondary-accent))]" size={28} /></div><div className="relative mt-6 flex items-center gap-4"><div className={`grid h-24 w-20 place-items-center rounded-xl border border-[hsl(var(--secondary-accent))]/60 bg-[linear-gradient(145deg,hsl(var(--secondary-accent)/.65),hsl(var(--primary)/.25))] shadow-[0_14px_40px_hsl(var(--secondary-accent)/.18)] transition-transform duration-500 ${opened ? 'rotate-[10deg] scale-105' : 'rotate-[-5deg]'}`}><Gem className="text-white" size={30} /></div><div><Button variant="outline" onClick={() => setOpened(!opened)} data-testid="button-preview-pack">{opened ? 'Close preview' : 'Open pack'} <Sparkles size={15} /></Button><p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{opened ? 'Visual reveal only · Coming Soon' : 'No pack logic connected'}</p></div></div></div>;
}

export function ProUpgradeCard({ compact = false }: { compact?: boolean }) {
  const [showNotice, setShowNotice] = useState(false);
  return <div className={`surface-elevated relative overflow-hidden rounded-2xl border border-[hsl(var(--secondary-accent))]/35 ${compact ? 'p-5' : 'p-6 sm:p-7'}`} data-testid="card-pro-upgrade"><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[hsl(var(--secondary-accent))]/12 blur-3xl" /><div className="relative flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><Crown size={18} className="text-[hsl(var(--accent))]" /><p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">Athlete Hub Pro</p></div><h3 className="mt-3 font-display text-4xl font-black uppercase">Take your game<br /><span className="text-gradient">further.</span></h3></div><span className="rounded-full border border-[hsl(var(--secondary-accent))]/40 px-2 py-1 font-mono text-[9px] uppercase text-[hsl(var(--secondary-accent))]">Coming Soon</span></div><div className="relative mt-5 grid gap-2 sm:grid-cols-2">{proFeatures.slice(0, compact ? 4 : 6).map(feature => <p key={feature.key} className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><span className="grid h-4 w-4 place-items-center rounded-full bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]">✓</span>{feature.label}</p>)}</div><div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-4"><div><span className="font-display text-3xl font-black">{proPricing.monthly}</span><span className="ml-1 text-xs text-[hsl(var(--muted-foreground))]">/ month</span><p className="font-mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{proPricing.annual} annual preview</p></div><Button onClick={() => setShowNotice(true)} variant="outline" data-testid="button-upgrade-pro">View Athlete Hub Pro <ArrowRight size={15} /></Button></div>{showNotice && <button onClick={() => setShowNotice(false)} className="relative mt-4 w-full rounded-lg bg-[hsl(var(--secondary-accent))]/15 px-3 py-2 text-left text-xs text-[hsl(var(--secondary-accent))]" data-testid="button-dismiss-pro-notice">Athlete Hub Pro is coming soon. Payments are not connected in this preview.</button>}</div>;
}

export function PlanPreviewControl() {
  const [plan, setPlan] = useState<Plan>(() => getPreviewPlan());
  if (!import.meta.env.DEV) return null;
  const updatePlan = (next: Plan) => {
    setPlan(next);
    setPreviewPlan(next);
  };
  return <div className="rounded-xl border border-dashed border-[hsl(var(--secondary-accent))]/40 bg-[hsl(var(--secondary-accent))]/8 p-4" data-testid="plan-preview-control"><div className="flex items-center justify-between gap-3"><div><p className="font-mono text-[9px] uppercase tracking-[.16em] text-[hsl(var(--secondary-accent))]">Development preview</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Test Free and Pro presentation states locally.</p></div><span className="rounded-full bg-[hsl(var(--secondary-accent))]/15 px-2 py-1 font-mono text-[9px] uppercase text-[hsl(var(--secondary-accent))]">{plan} user</span></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => updatePlan('free')} className={`rounded-lg px-3 py-2 text-xs font-bold ${plan === 'free' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`} data-testid="button-preview-free">Free user</button><button type="button" onClick={() => updatePlan('pro')} className={`rounded-lg px-3 py-2 text-xs font-bold ${plan === 'pro' ? 'bg-[hsl(var(--secondary-accent))] text-white' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`} data-testid="button-preview-pro">Pro user</button></div></div>;
}