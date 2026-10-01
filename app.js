// Koneksi Vilza VVIP Rental Transport ke Supabase.
// Tanpa Node.js dan tanpa npm: file ini dimuat langsung oleh frontend/index.html dan berjalan di browser.
// Alur: halaman web -> backend/app.js -> Supabase (database di cloud)

// Isi dari Supabase: Project Settings > API
// Pakai PUBLISHABLE key (sb_publishable_...). JANGAN pakai secret key di file ini.
const SUPABASE_URL = 'https://qjnwpmzabwdojqobhxyu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OinbNXi6GRxzyjnX9S0Isg_mCOSoa3W';

// jalur: 'tabel', 'tabel/id', atau 'tabel?select=...&order=...'
async function dbRequest(metode, jalur, body) {
  if (!/^https:\/\/.+\.supabase\.co$/.test(SUPABASE_URL) || !SUPABASE_KEY || /XXXX|ISI_/.test(SUPABASE_KEY))
    throw new Error('SUPABASE_URL / SUPABASE_KEY di backend/app.js belum diisi dengan benar');
  const [lokasi, query = ''] = jalur.split('?');
  const [tabel, id] = lokasi.split('/');
  const q = new URLSearchParams(query);
  if (id) q.set('id', 'eq.' + id);
  return fetch(`${SUPABASE_URL}/rest/v1/${tabel}?${q}`, {
    method: metode,
    body: body ? JSON.stringify(body) : undefined,
    headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=representation' }
  });
}
