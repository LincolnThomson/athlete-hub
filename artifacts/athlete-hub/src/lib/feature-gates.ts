export type Plan = 'free' | 'pro';

export type ProFeature =
  | 'advanced-stats'
  | 'unlimited-history'
  | 'advanced-analytics'
  | 'premium-cards'
  | 'additional-rewards'
  | 'future-ai-insights';

export const proPricing = {
  monthly: '$4.99',
  annual: '$29.99',
} as const;

export const proFeatures: Array<{ key: ProFeature; label: string }> = [
  { key: 'advanced-stats', label: 'Advanced statistics' },
  { key: 'unlimited-history', label: 'Unlimited game history' },
  { key: 'advanced-analytics', label: 'Advanced analytics' },
  { key: 'premium-cards', label: 'Premium card designs' },
  { key: 'additional-rewards', label: 'Additional rewards' },
  { key: 'future-ai-insights', label: 'Future AI insights' },
];

const previewPlanKey = 'athlete-hub-preview-plan';

export function getPreviewPlan(): Plan {
  if (!import.meta.env.DEV) return 'free';
  return window.localStorage.getItem(previewPlanKey) === 'pro' ? 'pro' : 'free';
}

export function setPreviewPlan(plan: Plan) {
  if (import.meta.env.DEV) window.localStorage.setItem(previewPlanKey, plan);
}

export function canUseFeature(feature: ProFeature, plan = getPreviewPlan()) {
  if (plan === 'pro') return true;
  return !proFeatures.some(item => item.key === feature);
}
