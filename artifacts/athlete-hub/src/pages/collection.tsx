import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { AppShell } from '@/components/athlete-ui';
import { RARITY_COLORS } from '@/lib/cards';

export default function Collection() {
  const mockCards = [
    { id: '1', number: '001', title: 'First Game', rarity: 'Common' as const },
    { id: '2', number: '014', title: '20-Point Game', rarity: 'Rare' as const },
    { id: '3', number: '026', title: 'Triple Double', rarity: 'Epic' as const },
  ];

  return <AppShell><div className="atmosphere min-h-[calc(100dvh-1px)]"><div className="mx-auto max-w-7xl px-5 py-7 md:px-10 md:py-10"><Link href="/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"><ArrowLeft size={16} /> Back</Link><div className="mb-8"><h1 className="font-display text-5xl font-black uppercase">Your Collection</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{mockCards.length} / 100 cards</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{mockCards.map((card) => <div key={card.id} className="surface-elevated rounded-2xl border border-[hsl(var(--border))] p-5"><div className="aspect-square rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center mb-4"><div className="text-center"><p className="font-mono text-[10px] uppercase">AH / {card.number}</p><p className={`font-display text-2xl font-black uppercase mt-2 ${RARITY_COLORS[card.rarity]}`}>{card.rarity}</p></div></div><p className="font-bold text-sm">{card.title}</p><p className={`text-xs font-bold mt-1 ${RARITY_COLORS[card.rarity]}`}>{card.rarity}</p></div>)}</div></div></div></AppShell>;
}
