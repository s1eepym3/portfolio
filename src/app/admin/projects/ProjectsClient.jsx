'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsClient({ initialProjects }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    slug: '',
    framing: '',
    summary: '',
    stack: '',
    image: '',
    year: '',
    repoUrl: '',
    demoUrl: '',
    order: 0,
    published: true,
    csOverview: '',
    csProblem: '',
    csApproach: '',
    csChallenge: '',
    csResult: '',
    csDraftOverview: '',
    csDraftProblem: '',
    csDraftApproach: '',
    csDraftChallenge: '',
    csDraftResult: '',
    galleryRaw: '' // custom format: url | alt per line
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      number: '', title: '', slug: '', framing: '', summary: '', stack: '',
      image: '', year: '', repoUrl: '', demoUrl: '', order: 0, published: true,
      csOverview: '', csProblem: '', csApproach: '', csChallenge: '', csResult: '',
      csDraftOverview: '', csDraftProblem: '', csDraftApproach: '', csDraftChallenge: '', csDraftResult: '',
      galleryRaw: ''
    });
    setEditingId(null);
    setIsFormOpen(false);
    setError('');
  };

  const openEditForm = (proj) => {
    const galleryLines = (proj.images || []).map(img => `${img.url} | ${img.alt || ''}`).join('\n');
    setFormData({
      number: proj.number,
      title: proj.title,
      slug: proj.slug,
      framing: proj.framing,
      summary: proj.summary,
      stack: proj.stack ? proj.stack.join(', ') : '',
      image: proj.image,
      year: proj.year || '',
      repoUrl: proj.repoUrl || '',
      demoUrl: proj.demoUrl || '',
      order: proj.order,
      published: proj.published,
      csOverview: proj.caseStudy?.overview || '',
      csProblem: proj.caseStudy?.problem || '',
      csApproach: proj.caseStudy?.approach || '',
      csChallenge: proj.caseStudy?.challenge || '',
      csResult: proj.caseStudy?.result || '',
      csDraftOverview: proj.caseStudy?.draftOverview || '',
      csDraftProblem: proj.caseStudy?.draftProblem || '',
      csDraftApproach: proj.caseStudy?.draftApproach || '',
      csDraftChallenge: proj.caseStudy?.draftChallenge || '',
      csDraftResult: proj.caseStudy?.draftResult || '',
      galleryRaw: galleryLines
    });
    setEditingId(proj.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const parsedImages = formData.galleryRaw.split('\n').filter(l => l.trim()).map(line => {
      const parts = line.split('|');
      return { src: parts[0].trim(), alt: (parts[1] || '').trim() };
    });

    const hasCs = formData.csOverview || formData.csProblem || formData.csApproach || formData.csChallenge || formData.csResult ||
                  formData.csDraftOverview || formData.csDraftProblem || formData.csDraftApproach || formData.csDraftChallenge || formData.csDraftResult;

    const payload = {
      ...formData,
      number: Number(formData.number),
      order: Number(formData.order),
      stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
      caseStudy: hasCs ? {
        overview: formData.csOverview,
        problem: formData.csProblem,
        approach: formData.csApproach,
        challenge: formData.csChallenge,
        result: formData.csResult,
        draftOverview: formData.csDraftOverview,
        draftProblem: formData.csDraftProblem,
        draftApproach: formData.csDraftApproach,
        draftChallenge: formData.csDraftChallenge,
        draftResult: formData.csDraftResult
      } : null,
      images: parsedImages
    };

    try {
      const url = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
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

      const updatedProj = await res.json();

      if (editingId) {
        setProjects(projects.map(p => p.id === editingId ? updatedProj : p).sort((a,b) => a.order - b.order));
      } else {
        setProjects([...projects, updatedProj].sort((a,b) => a.order - b.order));
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
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      
      setProjects(projects.filter(p => p.id !== id));
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
          + Add New Project
        </button>
      ) : (
        <div className="mb-8 border border-[var(--line)] p-6 bg-[var(--bg-elevated)]">
          <h2 className="text-xl font-serif text-[var(--text)] mb-4">{editingId ? 'Edit Project' : 'New Project'}</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Number</label>
                <input type="number" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Slug</label>
                <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1">Framing</label>
              <input type="text" required value={formData.framing} onChange={e => setFormData({...formData, framing: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1">Summary</label>
              <textarea required value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)] h-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Stack (comma separated)</label>
                <input type="text" value={formData.stack} onChange={e => setFormData({...formData, stack: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Cover Image Path</label>
                <input type="text" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Year</label>
                <input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Repo URL</label>
                <input type="url" value={formData.repoUrl} onChange={e => setFormData({...formData, repoUrl: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Demo URL</label>
                <input type="url" value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Order</label>
                <input type="number" required value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)]" />
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-4 mt-2">
              <h3 className="font-serif text-lg mb-4 text-[var(--accent)]">Case Study</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Overview</label>
                  <textarea value={formData.csOverview} onChange={e => setFormData({...formData, csOverview: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Problem</label>
                  <textarea value={formData.csProblem} onChange={e => setFormData({...formData, csProblem: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Approach</label>
                  <textarea value={formData.csApproach} onChange={e => setFormData({...formData, csApproach: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Challenge</label>
                  <textarea value={formData.csChallenge} onChange={e => setFormData({...formData, csChallenge: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Result</label>
                  <textarea value={formData.csResult} onChange={e => setFormData({...formData, csResult: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 h-20" />
                </div>
              </div>
            </div>

            <div className="border border-dashed border-[var(--line)] bg-[var(--bg)] p-4 mt-2">
              <h3 className="font-serif text-lg mb-2 text-[var(--text-muted)]">Draft / Unverified Notes</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">Not shown publicly. Notes for later verification.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Draft Overview</label>
                  <textarea value={formData.csDraftOverview} onChange={e => setFormData({...formData, csDraftOverview: e.target.value})} className="w-full bg-[var(--bg-elevated)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Draft Problem</label>
                  <textarea value={formData.csDraftProblem} onChange={e => setFormData({...formData, csDraftProblem: e.target.value})} className="w-full bg-[var(--bg-elevated)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Draft Approach</label>
                  <textarea value={formData.csDraftApproach} onChange={e => setFormData({...formData, csDraftApproach: e.target.value})} className="w-full bg-[var(--bg-elevated)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Draft Challenge</label>
                  <textarea value={formData.csDraftChallenge} onChange={e => setFormData({...formData, csDraftChallenge: e.target.value})} className="w-full bg-[var(--bg-elevated)] border border-[var(--line)] p-2 h-20" />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Draft Result</label>
                  <textarea value={formData.csDraftResult} onChange={e => setFormData({...formData, csDraftResult: e.target.value})} className="w-full bg-[var(--bg-elevated)] border border-[var(--line)] p-2 h-20" />
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-4 mt-2">
              <h3 className="font-serif text-lg mb-4 text-[var(--accent)]">Gallery Images</h3>
              <div>
                <label className="block text-[var(--text-muted)] mb-1">One per line, format: `path/to/image.png | Alt text`</label>
                <textarea value={formData.galleryRaw} onChange={e => setFormData({...formData, galleryRaw: e.target.value})} className="w-full bg-[var(--bg)] border border-[var(--line)] p-2 focus:outline-none focus:border-[var(--accent)] h-32" />
              </div>
            </div>

            {error && <div className="text-red-500 mt-2">{error}</div>}

            <div className="flex gap-4 mt-4">
              <button type="submit" disabled={isLoading} className="bg-[var(--accent)] text-black px-6 py-2 font-semibold hover:bg-[#b08b3b] transition-colors disabled:opacity-50">
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={resetForm} className="border border-[var(--line)] px-6 py-2 hover:bg-[var(--bg)] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4 font-mono text-sm">
        {projects.map(proj => (
          <div key={proj.id} className="border border-[var(--line)] p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[var(--bg-elevated)]">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[var(--accent)]">{proj.number < 10 ? `0${proj.number}` : proj.number}</span>
                <span className="font-serif text-lg text-[var(--text)]">{proj.title}</span>
                <span className="text-[var(--text-muted)]">/{proj.slug}</span>
              </div>
              <div className="text-[var(--text-muted)] mt-1 truncate">{proj.framing}</div>
              <div className="text-xs mt-2 text-[var(--accent)]/70">
                Has Case Study: {proj.caseStudy ? 'Yes' : 'No'} | Gallery: {(proj.images || []).length} images
              </div>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <span>Order: {proj.order}</span>
              <button onClick={() => openEditForm(proj)} className="hover:text-[var(--accent)] transition-colors underline">Edit</button>
              <button onClick={() => handleDelete(proj.id)} className="hover:text-red-500 transition-colors underline">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-[var(--text-muted)] italic">No projects found.</div>
        )}
      </div>
    </div>
  );
}
