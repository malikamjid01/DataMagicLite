const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiClient(path: string, options: RequestInit = {}) {
  // Supabase token lo
  const { data } = await import('../lib/supabase').then(m => 
    m.supabase.auth.getSession()
  );
  const token = data.session?.access_token;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  const body = await res.json();
  if (!res.ok) throw new Error(body.detail || 'Request failed');
  return body;
}

export default apiClient;