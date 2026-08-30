import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [form, setForm] = useState({ name: 'Alex Morgan', email: 'alex@example.com', password: 'password123' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form.name, form.email, form.password);
    if (result.success) router.push('/dashboard');
  };

  return (
    <div className="page" style={{ display: 'grid', placeItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 460, padding: 28 }}>
        <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 30 }}>Create account</h2>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Start using AI inbox assistance.</p>

        {error && (
          <div className="card" style={{ padding: 12, marginBottom: 20, borderColor: 'rgba(248, 113, 113, 0.35)' }}>
            <span style={{ color: '#fca5a5' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#cbd5e1' }}>Full name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#cbd5e1' }}>Email</label>
            <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#cbd5e1' }}>Password</label>
            <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: 18, color: '#94a3b8' }}>
          Already have an account? <Link href="/login" style={{ color: '#67e8f9' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
