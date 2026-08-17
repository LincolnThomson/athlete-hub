import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { AppShell, Button } from '@/components/athlete-ui';

export default function Pack() {
  const [opened, setOpened] = useState(false);
  const mockCard = { number: '077', title: 'The Comeback', rarity: 'Legendary' };

  return <AppShell><div className="atmosphere min-h-[calc(100dvh-1px)]"><div className="mx-auto max-w-2xl px-5 py-7 md:px-10 md:py-10"><Link href="/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"><ArrowLeft size={16} /> Back</Link><div className="surface-elevated rounded-2xl border border-[hsl(var(--border))] p-7 text-center"><h1 className="font-display text-4xl font-black uppercase">Open Your Pack</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Earn packs by logging games and unlocking achievements</p><div className="mt-12"><div className="aspect-square max-w-xs mx-auto rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setOpened(true)}><div className="text-center"><p className="font-display text-6xl">📦</p><p className="mt-4 font-bold text-white">Tap to Open</p></div></div></div>{opened && <div className="mt-8 p-6 rounded-2xl bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/50"><p className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--primary))]">AH / {mockCard.number}</p><p className="mt-2 font-display text-3xl font-black uppercase">{mockCard.title}</p><p className="mt-1 font-bold text-yellow-400">{mockCard.rarity}</p><p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">Added to your collection!</p></div>}</div></div></div></AppShell>;
}
