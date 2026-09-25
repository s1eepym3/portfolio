'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TimelineClient({ initialEntries }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    year: '',
    role: '',
    company: '',
    description: '',
    order: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const openNewForm = () => {
    setFormData({ year: '', role: '', company: '', description: '', order: entries.length });
    setEditingId(null);
    setIsFormOpen(true);
    setError('');
  };

  const openEditForm = (entry) => {
    setFormData({
      year: entry.year,
      role: entry.role,
      company: entry.company,
      description: entry.description || '',
      order: entry.order
    });
    setEditingId(entry.id);
    setIsFormOpen(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.year || !formData.role || !formData.company || formData.order === '') {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    const url = editingId ? `/api/admin/timeline/${editingId}` : '/api/admin/timeline';
    const method = editingId ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order)
        })
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      } else {
        setIsFormOpen(false);
        router.refresh(); 
        const updatedEntry = await res.json();
        if (editingId) {
          setEntries(entries.map(e => e.id === editingId ? updatedEntry : e).sort((a,b) => a.order - b.order));
        } else {
          setEntries([...entries, updatedEntry].sort((a,b) => a.order - b.order));
        }
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      const res = await fetch(`/api/admin/timeline/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries(entries.filter(e => e.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('An error occurred.');
    }
  };

  return (
    <div className="font-mono text-sm max-w-4xl">
      <button 
        onClick={openNewForm}
        className="mb-8 bg-[var(--accent)] text-black px-4 py-2 hover:bg-[#b08b3b] transition-colors"
      >
        + Add New Entry
      </button>

      {isFormOpen && (
        <div className="mb-12 border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
          <h2 className="text-xl font-serif text-[var(--text)] mb-4">{editingId ? 'Edit Entry' : 'New Entry'}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Year *</label>
                <input 
                  type="text" 
                  value={formData.year} 
                  onChange={e => setFormData({...formData, year: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Role *</label>
                <input 
                  type="text" 
                  value={formData.role} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                  maxLength={100}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[var(--text-muted)] mb-1">Company *</label>
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                  maxLength={100}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[var(--text-muted)] mb-1">Description (optional)</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors min-h-[100px]"
                  maxLength={1000}
                />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Order (Number) *</label>
                <input 
                  type="number" 
                  value={formData.order} 
                  onChange={e => setFormData({...formData, order: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                />
              </div>
            </div>
            
            {error && <div className="text-red-400">{error}</div>}
            
            <div className="flex gap-4 mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[var(--accent)] text-black px-6 py-2 hover:bg-[#b08b3b] transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="border border-[var(--line)] text-[var(--text)] px-6 py-2 hover:text-[var(--text-muted)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {entries.map(entry => (
          <div key={entry.id} className="border border-[var(--line)] p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[var(--bg-elevated)]">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[var(--accent)]">{entry.year}</span>
                <span className="font-serif text-lg text-[var(--text)]">{entry.role}</span>
              </div>
              <div className="text-[var(--text-muted)] mt-1">{entry.company}</div>
              {entry.description && (
                <div className="mt-2 text-[var(--text-muted)] text-xs line-clamp-2 leading-relaxed max-w-xl">
                  {entry.description}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] shrink-0">
              <span>Order: {entry.order}</span>
              <button 
                onClick={() => openEditForm(entry)}
                className="hover:text-[var(--accent)] transition-colors border border-[var(--line)] px-3 py-1"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(entry.id)}
                className="hover:text-red-400 transition-colors border border-[var(--line)] px-3 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-[var(--text-muted)] italic">No timeline entries found.</div>
        )}
      </div>
    </div>
  );
}
