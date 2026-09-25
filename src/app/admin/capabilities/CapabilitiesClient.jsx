'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CapabilitiesClient({ initialCapabilities }) {
  const router = useRouter();
  const [capabilities, setCapabilities] = useState(initialCapabilities || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    framing: '',
    proofSlugs: '',
    order: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ number: '', name: '', framing: '', proofSlugs: '', order: 0 });
    setEditingId(null);
    setIsFormOpen(false);
    setError('');
  };

  const openEditForm = (cap) => {
    setFormData({
      number: cap.number,
      name: cap.name,
      framing: cap.framing,
      proofSlugs: cap.proofSlugs ? cap.proofSlugs.join(', ') : '',
      order: cap.order
    });
    setEditingId(cap.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const payload = {
      ...formData,
      number: Number(formData.number),
      order: Number(formData.order),
      proofSlugs: formData.proofSlugs.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const url = editingId ? `/api/admin/capabilities/${editingId}` : '/api/admin/capabilities';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Request failed');
      }

      const updatedCap = await res.json();

      if (editingId) {
        setCapabilities(capabilities.map(c => c.id === editingId ? updatedCap : c).sort((a,b) => a.order - b.order));
      } else {
        setCapabilities([...capabilities, updatedCap].sort((a,b) => a.order - b.order));
      }
      
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this capability?')) return;
    
    try {
      const res = await fetch(`/api/admin/capabilities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      setCapabilities(capabilities.filter(c => c.id !== id));
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {!isFormOpen ? (
        <button 
          onClick={() => setIsFormOpen(true)}
          className="mb-6 border border-[var(--line)] px-4 py-2 hover:bg-[var(--bg-elevated)] transition-colors font-mono text-sm"
        >
          + Add New Capability
        </button>
      ) : (
        <div className="mb-8 border border-[var(--line)] p-6 bg-[var(--bg-elevated)]">
          <h2 className="text-xl font-serif text-[var(--text)] mb-4">{editingId ? 'Edit Capability' : 'New Capability'}</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[var(--text-muted)] mb-1">Number (e.g. 1)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.number} 
                  onChange={e => setFormData({...formData, number: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[var(--text-muted)] mb-1">Name (e.g. Encryption)</label>
                <input 
                  type="text" 
                  required 
                  maxLength={100}
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1">Framing</label>
              <textarea 
                required
                maxLength={500}
                value={formData.framing} 
                onChange={e => setFormData({...formData, framing: e.target.value})}
                className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)] h-24"
              />
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1">Proof Slugs (comma separated project slugs)</label>
              <input 
                type="text" 
                value={formData.proofSlugs} 
                onChange={e => setFormData({...formData, proofSlugs: e.target.value})}
                className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]"
                placeholder="e.g. secureapi, converter"
              />
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1">Order</label>
              <input 
                type="number" 
                required 
                value={formData.order} 
                onChange={e => setFormData({...formData, order: e.target.value})}
                className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            {error && <div className="text-red-500 mt-2">{error}</div>}

            <div className="flex gap-4 mt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-[var(--accent)] text-black px-6 py-2 font-semibold hover:bg-[#b08b3b] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="border border-[var(--line)] px-6 py-2 hover:bg-[var(--bg)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4 font-mono text-sm">
        {capabilities.map(cap => (
          <div key={cap.id} className="border border-[var(--line)] p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[var(--bg-elevated)]">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[var(--accent)]">{cap.number < 10 ? `0${cap.number}` : cap.number}</span>
                <span className="font-serif text-lg text-[var(--text)]">{cap.name}</span>
              </div>
              <div className="text-[var(--text-muted)] mt-1">{cap.framing}</div>
              {cap.proofSlugs && cap.proofSlugs.length > 0 && (
                <div className="text-xs mt-2 text-[var(--accent)]/70">
                  Proofs: {cap.proofSlugs.join(', ')}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <span>Order: {cap.order}</span>
              <button 
                onClick={() => openEditForm(cap)}
                className="hover:text-[var(--accent)] transition-colors underline"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(cap.id)}
                className="hover:text-red-500 transition-colors underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {capabilities.length === 0 && (
          <div className="text-[var(--text-muted)] italic">No capabilities found.</div>
        )}
      </div>
    </div>
  );
}
