import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) router.push('/dashboard');
  };

  return (
    <div className="page" style={{ display: 'grid', placeItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 440, padding: 28 }}>
        <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 30 }}>Welcome back</h2>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Sign in to continue to your inbox.</p>

        {error && (
          <div className="card" style={{ padding: 12, marginBottom: 20, borderColor: 'rgba(248, 113, 113, 0.35)' }}>
            <span style={{ color: '#fca5a5' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#cbd5e1' }}>Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#cbd5e1' }}>Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: 18, color: '#94a3b8' }}>
          Don’t have an account? <Link href="/register" style={{ color: '#67e8f9' }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
