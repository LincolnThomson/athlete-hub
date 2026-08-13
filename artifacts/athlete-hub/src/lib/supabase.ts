import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zcqxscknywlepjlyfmxj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_JxabTNZpdFsAYbsmhDW7nw_kBueXAfm';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
