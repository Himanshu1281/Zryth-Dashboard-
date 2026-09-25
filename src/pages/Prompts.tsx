import React, { useState, useEffect } from 'react';
import { Layout } from '../layouts/Layout';
import { supabase } from '../config/supabase';

interface Prompt {
  id: string;
  tag: string;
  content: string;
  created_at?: string;
}

export function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const [formTag, setFormTag] = useState("");
  const [formContent, setFormContent] = useState("");

  const filteredPrompts = prompts.filter(prompt => 
    prompt.tag.toLowerCase().includes(search.toLowerCase()) || 
    prompt.content.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('input-prompt-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPrompts(data as Prompt[]);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      alert('Failed to load prompts.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPrompt(null);
    setFormTag("greeting_prompt");
    setFormContent("");
    setIsModalOpen(true);
  };

  const openEditModal = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setFormTag(prompt.tag);
    setFormContent(prompt.content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
  };

  const savePrompt = async () => {
    if (!formTag.trim()) {
      alert("Please provide a prompt identifier.");
      return;
    }
    if (!formContent.trim()) {
      alert("Please provide prompt content.");
      return;
    }

    setSaving(true);
    try {
      if (editingPrompt) {
        const { error } = await supabase
          .from('prompts')
          .update({ tag: formTag, content: formContent })
          .eq('id', editingPrompt.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('prompts')
          .insert([{ tag: formTag, content: formContent }]);

        if (error) {
          if (error.code === '23505') {
            alert('A prompt with this tag already exists.');
            return;
          }
          throw error;
        }
      }

      await fetchPrompts();
      closeModal();
    } catch (error) {
      console.error('Error saving prompt:', error);
      alert('Failed to save prompt.');
    } finally {
      setSaving(false);
    }
  };

  const deletePrompt = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        const { error } = await supabase
          .from('prompts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setPrompts(prompts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting prompt:', error);
        alert('Failed to delete prompt.');
      }
    }
  };

  const copyPromptText = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    const btn = e.currentTarget;
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span class="text-tertiary font-medium">Copied!</span>';
    setTimeout(() => {
      btn.innerHTML = origHtml;
    }, 1500);
  };

  return (
    <Layout title="Prompts" disablePadding>
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Prompts</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Manage behavioral guidelines, tone, and personas executed by Maya AI Voice.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-on-surface-variant bg-surface-container border border-surface-container-high px-2.5 py-1 rounded">
              {prompts.length} active prompt{prompts.length !== 1 ? 's' : ''}
            </span>
            <button 
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold transition shadow-[0_0_16px_rgba(37,99,235,0.35)] active:scale-95" 
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Prompt</span>
            </button>
          </div>
        </section>
          
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined text-on-surface-variant absolute left-3 pointer-events-none text-[18px]">search</span>
          <input 
            id="input-prompt-search"
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-container border border-surface-container-high rounded-lg pl-9 pr-12 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" 
            placeholder="Search prompts, personas, guidelines..." 
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-on-surface-variant bg-surface-container-high border border-surface-container-highest rounded">⌘K</kbd>
          </div>
        </div>

        <div className="space-y-3" id="prompts-list">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredPrompts.map(prompt => {
            const snippet = prompt.content.length > 70 ? prompt.content.slice(0, 67) + '...' : prompt.content;
            
            return (
              <div key={prompt.id} className="bg-surface-container-low border border-surface-container-high rounded-lg shadow-sm transition-colors hover:border-surface-container-highest overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none hover:bg-surface-container/30 transition-colors [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-medium shrink-0">
                        {prompt.tag}
                      </span>
                      <span className="text-[10px] bg-tertiary-container/20 text-tertiary font-mono px-2 py-0.5 rounded border border-tertiary/20 shrink-0">Active</span>
                      <span className="text-xs text-on-surface-variant truncate hidden md:inline max-w-sm pl-2 border-l border-surface-container-high">
                        {snippet}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4" onClick={e => e.stopPropagation()}>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const details = (e.target as HTMLElement).closest('details');
                          if (details) details.open = !details.open;
                        }} 
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-on-surface hover:text-white bg-surface-container border border-surface-container-high rounded hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform group-open:rotate-180">expand_more</span>
                        <span className="group-open:hidden">View Prompt</span>
                        <span className="hidden group-open:inline">Hide Prompt</span>
                      </button>
                      <button 
                        className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" 
                        onClick={() => openEditModal(prompt)} 
                        title="Edit prompt"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button 
                        className="p-1.5 rounded text-on-surface-variant hover:text-red-400 hover:bg-surface-container transition-colors" 
                        onClick={() => deletePrompt(prompt.id)} 
                        title="Delete prompt"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </summary>
                  <div className="p-5 pt-0 border-t border-surface-container-high/60 space-y-3 bg-surface-container-lowest/50">
                    <div className="mt-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Prompt Content</span>
                        <button 
                          type="button" 
                          onClick={(e) => copyPromptText(prompt.content, e)} 
                          className="text-[10px] text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-mono transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                          <span>Copy</span>
                        </button>
                      </div>
                      <div className="bg-surface-container border border-surface-container-high/60 rounded-md p-3.5 text-sm text-on-surface font-normal leading-relaxed">
                        {prompt.content}
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            );
          })}
          
          {!loading && filteredPrompts.length === 0 && (
            <div className="text-center py-10 text-on-surface-variant text-sm">
              No prompts found matching your search.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-surface-container-low border border-surface-container-high rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-on-surface">
            <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container/40">
              <h3 className="text-sm font-semibold tracking-wide">
                {editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
              </h3>
              <button 
                className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors disabled:opacity-50" 
                onClick={closeModal}
                disabled={saving}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="input-prompt-name">Prompt Identifier / Tag</label>
                <select 
                  id="input-prompt-name" 
                  value={formTag}
                  onChange={e => setFormTag(e.target.value)}
                  disabled={saving}
                  className="w-full px-3 py-2 bg-surface-container border border-surface-container-high rounded text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition font-mono disabled:opacity-50"
                >
                  <option value="greeting_prompt">greeting_prompt</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="input-prompt-content">Prompt Content</label>
                <textarea 
                  id="input-prompt-content" 
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  disabled={saving}
                  className="w-full bg-surface-container border border-surface-container-high rounded text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition p-3 resize-y leading-relaxed disabled:opacity-50" 
                  placeholder="Enter system prompt guidelines..." 
                  rows={5}
                ></textarea>
              </div>
            </div>
            
            <div className="px-6 py-3.5 border-t border-surface-container-high bg-surface-container flex items-center justify-end gap-2">
              <button 
                className="px-4 py-2 rounded text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50" 
                onClick={closeModal} 
                type="button"
                disabled={saving}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-semibold rounded shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50" 
                onClick={savePrompt} 
                type="button"
                disabled={saving}
              >
                {saving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
                {saving ? 'Saving...' : 'Save Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
