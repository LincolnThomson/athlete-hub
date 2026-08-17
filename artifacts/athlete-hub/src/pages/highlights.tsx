import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { AppShell, Button } from '@/components/athlete-ui';

export default function Highlights() {
  const [highlights, setHighlights] = useState([
    { id: '1', title: 'Clutch three', url: 'https://example.com/1' },
    { id: '2', title: 'Fast break', url: 'https://example.com/2' },
  ]);

  return <AppShell><div className="atmosphere min-h-[calc(100dvh-1px)]"><div className="mx-auto max-w-4xl px-5 py-7 md:px-10 md:py-10"><Link href="/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"><ArrowLeft size={16} /> Back</Link><div className="mb-8 flex items-center justify-between"><h1 className="font-display text-4xl font-black uppercase">Your Highlights</h1><Button className="inline-flex items-center gap-2"><Plus size={17} /> Add Highlight</Button></div><div className="grid gap-4 md:grid-cols-2">{highlights.map((h) => <div key={h.id} className="surface-elevated rounded-2xl border border-[hsl(var(--border))] p-5"><div className="aspect-video rounded-lg bg-slate-700 mb-4 flex items-center justify-center"><p className="text-2xl">🎥</p></div><p className="font-bold">{h.title}</p><p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{h.url}</p><button className="mt-3 text-red-400 hover:text-red-300 text-xs font-bold"><Trash2 size={14} /> Delete</button></div>))}</div></div></div></AppShell>;
}
