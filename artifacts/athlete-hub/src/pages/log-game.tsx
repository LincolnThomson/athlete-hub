import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button, AppShell } from '@/components/athlete-ui';
import { supabase } from '../lib/supabase';

export default function LogGame() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    points: '0',
    rebounds: '0',
    assists: '0',
    steals: '0',
    blocks: '0',
    turnovers: '0',
    minutes: '0',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error: gameError } = await supabase.from('games').insert([{ user_id: user.id, date: formData.date, opponent: formData.opponent, points: parseInt(formData.points), rebounds: parseInt(formData.rebounds), assists: parseInt(formData.assists), steals: parseInt(formData.steals), blocks: parseInt(formData.blocks), turnovers: parseInt(formData.turnovers), minutes: parseInt(formData.minutes) }]);
      if (gameError) throw gameError;
      setLocation('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log game');
    } finally {
      setLoading(false);
    }
  };

  return <AppShell><div className="atmosphere min-h-[calc(100dvh-1px)]"><div className="mx-auto max-w-2xl px-5 py-7 md:px-10 md:py-10"><Link href="/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"><ArrowLeft size={16} /> Back</Link><div className="surface-elevated rounded-2xl border border-[hsl(var(--border))] p-7"><h1 className="font-display text-4xl font-black uppercase">Log Game</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Record your performance.</p>{error && <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/50 p-3"><p className="text-red-300 text-sm">{error}</p></div>}<form onSubmit={handleSubmit} className="mt-8 space-y-4"><div className="grid grid-cols-2 gap-4"><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase">Date</span><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm" required /></label><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase">Opponent</span><input type="text" name="opponent" value={formData.opponent} onChange={handleChange} placeholder="Team" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm" /></label></div><div><p className="mb-3 font-mono text-[10px] uppercase">Stats</p><div className="grid grid-cols-4 gap-2"><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">PTS</span><input type="number" name="points" value={formData.points} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">REB</span><input type="number" name="rebounds" value={formData.rebounds} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">AST</span><input type="number" name="assists" value={formData.assists} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">STL</span><input type="number" name="steals" value={formData.steals} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">BLK</span><input type="number" name="blocks" value={formData.blocks} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">TO</span><input type="number" name="turnovers" value={formData.turnovers} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label><label className="block"><span className="mb-1 block font-mono text-[9px] uppercase">MIN</span><input type="number" name="minutes" value={formData.minutes} onChange={handleChange} min="0" className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-center text-sm" /></label></div></div><Button type="submit" disabled={loading} className="mt-6 w-full py-3">{loading ? 'Logging...' : 'Log Game'} <ArrowRight size={17} /></Button></form></div></div></div></AppShell>;
}
