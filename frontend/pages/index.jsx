import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export default function HomePage() {
  const { isAuthenticated, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 60 }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>Intelligent Email Assistant</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/login" className="btn btn-secondary">Sign In</Link>
            <Link href="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </nav>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, alignItems: 'center' }}>
          <div>
            <div className="card" style={{ display: 'inline-block', padding: '8px 14px', marginBottom: 18, color: '#a5b4fc' }}>
              AI-powered Gmail productivity
            </div>
            <h1 style={{ fontSize: 58, lineHeight: 1.1, margin: '0 0 18px', fontWeight: 800 }}>
              Turn your inbox into an AI workflow.
            </h1>
            <p style={{ fontSize: 18, color: '#cbd5e1', maxWidth: 700, marginBottom: 30 }}>
              Connect Gmail, summarize long threads, draft polished replies, prioritize important emails, and send messages faster with secure AI assistance.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href={isAuthenticated ? '/dashboard' : '/login'} className="btn btn-primary">Launch Dashboard</Link>
              <Link href="/inbox" className="btn btn-secondary">View Inbox</Link>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ color: '#a5b4fc', fontSize: 12, textTransform: 'uppercase', marginBottom: 10 }}>Inbox</div>
                <div style={{ fontWeight: 700 }}>24 unread emails</div>
                <div style={{ color: '#94a3b8', marginTop: 6 }}>3 urgent threads</div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ color: '#67e8f9', fontSize: 12, textTransform: 'uppercase', marginBottom: 10 }}>AI Summary</div>
                <div style={{ color: '#e2e8f0' }}>Customer follow-up is due today with a 3-step action plan.</div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ color: '#34d399', fontSize: 12, textTransform: 'uppercase', marginBottom: 10 }}>Reply Draft</div>
                <div style={{ color: '#e2e8f0' }}>Thanks for the update. I’ll send the revised proposal by 5 PM.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
