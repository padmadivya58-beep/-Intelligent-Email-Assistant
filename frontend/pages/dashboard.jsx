import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';

export default function DashboardPage() {
  const { isAuthenticated, user, logout, initAuth } = useAuthStore();
  const [stats, setStats] = useState({ unread: 24, starred: 7, aiDrafts: 3, sent: 18 });
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!isAuthenticated) return;
    api.get('/mail/inbox').then((res) => {
      if (res.success) setEmails(res.data.emails || []);
    }).catch(() => {});
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="card" style={{ padding: 26 }}>
          <h2>Authentication required</h2>
          <p>Please sign in to access the dashboard.</p>
          <Link href="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#67e8f9', fontSize: 12, textTransform: 'uppercase' }}>Workspace</div>
            <h1 style={{ margin: '6px 0 0', fontSize: 36 }}>Inbox Dashboard</h1>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/inbox" className="btn btn-secondary">Inbox</Link>
            <Link href="/compose" className="btn btn-primary">Compose</Link>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 18, marginBottom: 24 }}>
          {[
            ['Unread', stats.unread, '#67e8f9'],
            ['Starred', stats.starred, '#fbbf24'],
            ['AI Drafts', stats.aiDrafts, '#a78bfa'],
            ['Sent', stats.sent, '#34d399'],
          ].map(([label, value, color]) => (
            <div key={label} className="card" style={{ padding: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 22 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ margin: 0 }}>Recent emails</h3>
              <Link href="/inbox" style={{ color: '#67e8f9' }}>View all</Link>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {emails.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>No messages yet. Connect Gmail to sync your inbox.</div>
              ) : emails.map((email) => (
                <Link key={email.id} href={`/thread/${email.id}`} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{email.from}</div>
                      <div style={{ marginTop: 4, color: '#cbd5e1' }}>{email.subject}</div>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{email.unread ? 'Unread' : 'Read'}</div>
                  </div>
                  <div style={{ color: '#94a3b8', marginTop: 8 }}>{email.preview}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ marginTop: 0 }}>AI assistant</h3>
            <div className="card" style={{ padding: 16, marginBottom: 14 }}>
              <div style={{ color: '#a5b4fc', fontSize: 12, marginBottom: 10 }}>Summary</div>
              <div style={{ color: '#e2e8f0' }}>Follow up on the product launch email and confirm final approval by Friday.</div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ color: '#34d399', fontSize: 12, marginBottom: 10 }}>Suggested reply</div>
              <div style={{ color: '#e2e8f0' }}>Thanks for the update. I’ll review the document and share final sign-off before 5 PM.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
