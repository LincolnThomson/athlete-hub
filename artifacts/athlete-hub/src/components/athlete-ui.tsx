import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Award, BarChart3, Boxes, ChartNoAxesColumnIncreasing, ChevronRight, CircleUserRound, Flame, Gamepad2, Home, Layers3, Menu, Shield, Sparkles, Target, Trophy, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { player, type Rarity } from '@/data/mock-data';

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
  { href: '/collection', label: 'Collection', icon: Boxes },
  { href: '/dashboard', label: 'Stats', icon: ChartNoAxesColumnIncreasing },
  { href: '/profile', label: 'Profile', icon: CircleUserRound },
];

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return <>
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] px-5 py-7 text-[hsl(var(--sidebar-foreground))] lg:flex">
      <Brand light />
      <div className="mt-12 flex flex-1 flex-col gap-2">
        <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[.22em] text-[hsl(var(--sidebar-foreground))]/45">My hub</p>
        {navItems.map(({ href, label, icon: Icon }, index) => {
          const active = label === 'Collection' ? location === '/collection' : label === 'Profile' ? location === '/profile' : location === '/dashboard' && index === 0;
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
        {navItems.map(({ href, label, icon: Icon }) => <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold ${((label === 'Collection' && location === '/collection') || (label === 'Profile' && location === '/profile') || (label === 'Home' && location === '/dashboard')) ? 'bg-[hsl(var(--primary))] text-white' : ''}`} data-testid={`link-mobile-nav-${label.toLowerCase()}`}><Icon size={18} />{label}</Link>)}
      </div>}
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-center justify-around border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/95 px-2 backdrop-blur lg:hidden">
      {navItems.map(({ href, label, icon: Icon }) => <Link key={label} href={href} className={`flex min-w-14 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-bold ${((label === 'Collection' && location === '/collection') || (label === 'Profile' && location === '/profile') || (label === 'Home' && location === '/dashboard')) ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`} data-testid={`link-bottom-nav-${label.toLowerCase()}`}><Icon size={19} /><span>{label}</span></Link>)}
    </nav>
  </>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="site-noise min-h-[100dvh] bg-[hsl(var(--background))]"><Navigation /><main className="pb-24 lg:ml-64 lg:pb-0">{children}</main></div>;
}

export function PlayerCard({ compact = false }: { compact?: boolean }) {
  return <div className={`card-shine relative overflow-hidden rounded-2xl bg-[hsl(var(--secondary))] p-1 text-[hsl(var(--secondary-foreground))] shadow-[8px_10px_0_rgba(23,39,55,.12)] ${compact ? 'w-[180px]' : 'w-full max-w-[310px]'}`} data-testid="card-player">
    <div className={`relative overflow-hidden rounded-xl border border-white/15 bg-[#24455c] ${compact ? 'h-[248px]' : 'aspect-[.72]'}`}>
      <div className="absolute inset-0 court-lines opacity-40" />
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[2px] border-white/20" /><div className="absolute -right-2 top-7 h-24 w-24 rounded-full border border-white/15" />
      <div className="absolute left-4 top-4 z-10 flex items-start justify-between right-4"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/50">ATHLETE HUB · 001</p><p className="font-display text-xl font-bold tracking-wide">PLAYER CARD</p></div><span className="rounded bg-[hsl(var(--accent))] px-2 py-1 font-mono text-[10px] font-bold text-[hsl(var(--accent-foreground))]">{player.position}</span></div>
      <div className="absolute bottom-[26%] left-1/2 z-10 -translate-x-1/2"><div className={`relative flex items-center justify-center rounded-full bg-[#e5b08e] shadow-[0_12px_20px_rgba(0,0,0,.2)] ${compact ? 'h-20 w-20' : 'h-28 w-28'}`}><UserRound size={compact ? 58 : 82} className="mt-5 text-[#203b4e]" strokeWidth={1.2} /></div><div className="absolute -bottom-2 left-1/2 h-14 w-28 -translate-x-1/2 rounded-t-[55px] bg-[hsl(var(--primary))]" /></div>
      <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/55">NORTHSIDE WOLVES</p><h3 className={`font-display font-black uppercase leading-none ${compact ? 'text-2xl' : 'text-4xl'}`}>{player.firstName}</h3><p className="mt-1 text-xs text-white/65">{player.grade} · {player.season}</p></div><div className="text-right"><p className="font-mono text-[9px] text-white/55">OVR</p><p className={`font-display font-black leading-none text-[hsl(var(--accent))] ${compact ? 'text-4xl' : 'text-6xl'}`}>{player.ovr}</p></div></div>
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
  const rarityClass: Record<Rarity, string> = { Common: 'text-[#7c756c] border-[#c9bfb1]', Rare: 'text-[#5f8297] border-[#9bb7c9]', Epic: 'text-[#866ba3] border-[#ad9ac5]', Elite: 'text-[#a17226] border-[#d8a954]', Legendary: 'text-[#c45732] border-[#e77149]' };
  return <article className={`card-shine group relative overflow-hidden rounded-xl border-2 bg-[hsl(var(--card))] p-2 transition-transform duration-300 hover:-translate-y-1 ${rarityClass[card.rarity]}`} data-testid={`collection-card-${card.id}`}><div className="relative aspect-[.78] overflow-hidden rounded-lg bg-[hsl(var(--secondary))]"><div className="absolute inset-0 court-lines opacity-40" /><div className="absolute inset-x-3 top-3 flex justify-between font-mono text-[8px] text-white/60"><span>AH / {card.number}</span><span>{card.rarity}</span></div><div className="absolute left-1/2 top-[38%] -translate-x-1/2"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5b08e]"><UserRound size={48} className="mt-3 text-[#203b4e]" strokeWidth={1} /></div><div className="mx-auto h-11 w-20 rounded-t-full bg-[hsl(var(--primary))]" /></div><Sparkles className="absolute bottom-3 right-3 text-white/25" size={26} /></div><div className="px-1 pb-1 pt-2"><div className="flex items-center justify-between"><p className="font-display text-lg font-bold uppercase leading-none text-[hsl(var(--foreground))]">{card.name}</p><span className={`font-mono text-[9px] font-bold uppercase ${rarityClass[card.rarity].split(' ')[0]}`}>{card.rarity}</span></div><p className="mt-1 truncate text-[10px] text-[hsl(var(--muted-foreground))]">{card.subtitle}</p></div></article>;
}