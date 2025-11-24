import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://ctdclpainnbdljwprmko.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZGNscGFpbm5iZGxqd3BybWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDM2NjMsImV4cCI6MjA3OTUxOTY2M30.emAfXaILbAn0niSh6fXO9jpveOJDnxyVzBgSdmJozEM';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
