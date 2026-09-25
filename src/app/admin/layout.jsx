import { checkAdminSession } from '@/lib/adminAuth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function AdminLayout({ children }) {
  const isAuth = await checkAdminSession();

  if (!isAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-mono bg-[var(--bg)] text-[var(--text)]">
        <h1 className="text-xl font-serif text-[var(--text)] mb-4">Not authorized</h1>
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Return to site
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)] p-4 flex items-center justify-between z-10 sticky top-0">
        <div className="text-xl font-serif">MH. — Admin</div>
        <LogoutButton />
      </header>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar / Tabs */}
        <nav className="border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--bg)] p-4 flex md:flex-col gap-6 overflow-x-auto whitespace-nowrap md:w-56 shrink-0">
          <Link href="/admin/timeline" className="font-mono text-sm uppercase tracking-wider hover:text-[var(--accent)] transition-colors">
            Timeline
          </Link>
          <Link href="/admin/capabilities" className="font-mono text-sm uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Capabilities
          </Link>
          <Link href="/admin/projects" className="font-mono text-sm uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Projects
          </Link>
        </nav>

        {/* Content */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
