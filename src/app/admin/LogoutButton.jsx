'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={loading}
      className="font-mono text-sm px-4 py-2 border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors disabled:opacity-50"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
