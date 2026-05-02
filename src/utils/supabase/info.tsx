const fallbackSupabaseUrl = "https://uhchrunehrcbhbyzpvwg.supabase.co";

export const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL ??
	(import.meta.env.VITE_SUPABASE_PROJECT_ID
		? `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`
		: fallbackSupabaseUrl);

export const projectId =
	supabaseUrl.replace(/^https?:\/\//, '').split('.')[0] ?? 'uhchrunehrcbhbyzpvwg';

export const publicAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ??
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoY2hydW5laHJjYmhieXpwdndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDM2NDYsImV4cCI6MjA5MjQxOTY0Nn0.5d5sZrrGsj5AjeEgOFUWBB5ojC-lIbKMFbP13RhlAFQ';
