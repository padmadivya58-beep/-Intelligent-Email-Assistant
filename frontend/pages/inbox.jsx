import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function InboxPage() {
  const { isAuthenticated, initAuth } = useAuthStore();
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
    return <div className="page" style={{ display: 'grid', placeItems: 'center' }}><div className="card" style={{ padding: 20 }}><h3>Please sign in</h3><Link href="/login" className="btn btn-primary">Go to login</Link></div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 style={{ margin: 0 }}>Inbox</h1>
          <Link href="/compose" className="btn btn-primary">Compose</Link>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            {emails.map((email) => (
              <Link key={email.id} href={`/thread/${email.id}`} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{email.from}</div>
                    <div style={{ color: '#cbd5e1', marginTop: 4 }}>{email.subject}</div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{email.unread ? 'Unread' : 'Read'}</div>
                </div>
                <div style={{ color: '#94a3b8', marginTop: 8 }}>{email.preview}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
