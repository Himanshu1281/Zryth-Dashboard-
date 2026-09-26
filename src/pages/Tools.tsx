import React, { useState, useEffect } from 'react';
import { Layout } from '../layouts/Layout';
import { supabase } from '../config/supabase';
import toast from 'react-hot-toast';

interface Tool {
  id: string;
  name: string;
  json_spec: string;
  execution_instruction: string;
}

export function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [toolToDelete, setToolToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formName, setFormName] = useState("");
  const [formJson, setFormJson] = useState("");
  const [formInstruction, setFormInstruction] = useState("");
  const [formErrors, setFormErrors] = useState<{name?: string, json?: string}>({});

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) || 
    (tool.execution_instruction && tool.execution_instruction.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTools(data.map((t: any) => ({
        id: t.id,
        name: t.name,
        json_spec: typeof t.json_spec === 'string' ? t.json_spec : JSON.stringify(t.json_spec, null, 2),
        execution_instruction: t.execution_instruction || ""
      })));
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingTool(null);
    setFormName("");
    setFormJson(`{\n  "type": "function",\n  "function": {\n    "name": "new_tool",\n    "description": "Description of tool",\n    "parameters": {\n      "type": "object",\n      "properties": {}\n    }\n  }\n}`);
    setFormInstruction("");
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (tool: Tool) => {
    setEditingTool(tool);
    setFormName(tool.name);
    setFormJson(tool.json_spec);
    setFormInstruction(tool.execution_instruction);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTool = async () => {
    const errors: {name?: string, json?: string} = {};
    if (!formName.trim()) {
      errors.name = "Tool name is required to save.";
    }
    
    let parsedJson;
    try {
      parsedJson = JSON.parse(formJson);
    } catch (e) {
      errors.json = "Ensure your JSON specification is formatted correctly. Valid JSON is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});

    setSaving(true);

    if (editingTool) {
      const { error } = await supabase.from('tools').update({
        name: formName,
        json_spec: parsedJson,
        execution_instruction: formInstruction
      }).eq('id', editingTool.id);

      if (!error) {
        setTools(tools.map(t => t.id === editingTool.id ? {
          ...t,
          name: formName,
          json_spec: JSON.stringify(parsedJson, null, 2),
          execution_instruction: formInstruction
        } : t));
        toast.success("Tool saved successfully.");
        closeModal();
      } else {
        toast.error("Failed to save tool: " + error.message);
      }
    } else {
      const { data, error } = await supabase.from('tools').insert({
        name: formName,
        json_spec: parsedJson,
        execution_instruction: formInstruction
      }).select().single();

      if (!error && data) {
        setTools([{
          id: data.id,
          name: data.name,
          json_spec: JSON.stringify(data.json_spec, null, 2),
          execution_instruction: data.execution_instruction || ""
        }, ...tools]);
        toast.success("Tool created successfully.");
        closeModal();
      } else if (error) {
        toast.error("Failed to create tool: " + error.message);
      }
    }
    setSaving(false);
  };

  const confirmDeleteTool = (id: string) => {
    setToolToDelete(id);
  };

  const executeDeleteTool = async () => {
    if (!toolToDelete) return;
    setIsDeleting(true);
    const { error } = await supabase.from('tools').delete().eq('id', toolToDelete);
    if (!error) {
      setTools(tools.filter(t => t.id !== toolToDelete));
      toast.success("Tool deleted successfully.");
    } else {
      toast.error("Failed to delete tool: " + error.message);
    }
    setIsDeleting(false);
    setToolToDelete(null);
  };

  return (
    <Layout title="Tools" disablePadding>
      <div className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Tools</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Configure external function calling schemas, parameters, and execution triggers for Maya AI Voice.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg text-xs font-mono text-on-surface-variant bg-surface-container border border-surface-container-high">
              {tools.length} active tool{tools.length !== 1 ? 's' : ''}
            </span>
            <button 
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold transition shadow-[0_0_16px_rgba(37,99,235,0.35)] active:scale-95" 
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Tool</span>
            </button>
          </div>
        </section>
          
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined text-on-surface-variant absolute left-3 pointer-events-none text-[18px]">search</span>
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-container border border-surface-container-high rounded-lg pl-9 pr-3 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" 
            placeholder="Search tools, schemas, functions..." 
          />
        </div>

        <div className="space-y-3" id="tools-list">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredTools.map(tool => {
            const snippetText = tool.execution_instruction || "JSON Function";
            const snippet = snippetText.length > 70 ? snippetText.slice(0, 67) + '...' : snippetText;
            
            return (
            <div key={tool.id} className="bg-surface-container-low border border-surface-container-high rounded-lg shadow-sm transition-colors hover:border-surface-container-highest overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none hover:bg-surface-container/30 transition-colors [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-medium shrink-0">
                      {tool.name}
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
                      <span className="group-open:hidden">View Schema</span>
                      <span className="hidden group-open:inline">Hide Schema</span>
                    </button>
                    <button 
                      className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" 
                      onClick={() => openEditModal(tool)} 
                      title="Edit tool"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      className="p-1.5 rounded text-on-surface-variant hover:text-red-400 hover:bg-surface-container transition-colors" 
                      onClick={() => confirmDeleteTool(tool.id)} 
                      title="Delete tool"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </summary>
                <div className="p-5 pt-0 border-t border-surface-container-high/60 space-y-3.5 bg-surface-container-lowest/50">
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">JSON Specification</span>
                      <span className="text-[10px] font-mono text-on-surface-variant">schema.json</span>
                    </div>
                    <pre className="bg-surface-container border border-surface-container-high/60 rounded-md p-3.5 font-mono text-xs text-primary overflow-x-auto leading-relaxed">
                      {tool.json_spec}
                    </pre>
                  </div>
                  {tool.execution_instruction && (
                    <div className="pt-3 border-t border-surface-container-high/60 flex items-start gap-2 bg-surface-container/50 p-2.5 rounded border border-surface-container-high/40">
                      <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0">info</span>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant block mb-0.5">Execution Instruction</span>
                        <p className="text-xs text-on-surface leading-relaxed">{tool.execution_instruction}</p>
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
            );
          })}
          
          {!loading && filteredTools.length === 0 && (
            <div className="text-center py-10 text-on-surface-variant text-sm">
              No tools found matching your search.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-surface-container-low border border-surface-container-high rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-on-surface">
            <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container/40">
              <h3 className="text-sm font-semibold tracking-wide">
                {editingTool ? 'Edit Tool' : 'Add Tool'}
              </h3>
              <button 
                className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors" 
                onClick={closeModal}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="input-tool-name">Tool Name</label>
                <input 
                  id="input-tool-name" 
                  type="text" 
                  value={formName}
                  onChange={e => { setFormName(e.target.value); if(formErrors.name) setFormErrors({...formErrors, name: undefined}); }}
                  className={`w-full px-3 py-2 bg-surface-container border ${formErrors.name ? 'border-error' : 'border-surface-container-high'} rounded text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition font-mono`}
                  placeholder="e.g. check_calendar_availability" 
                />
                {formErrors.name && <p className="text-[10px] text-error mt-1">{formErrors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="input-tool-json">JSON Specification</label>
                <textarea 
                  id="input-tool-json" 
                  value={formJson}
                  onChange={e => { setFormJson(e.target.value); if(formErrors.json) setFormErrors({...formErrors, json: undefined}); }}
                  className={`w-full bg-surface-container border ${formErrors.json ? 'border-error' : 'border-surface-container-high'} rounded text-xs font-mono text-primary placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition p-3 resize-y leading-relaxed`}
                  placeholder="{\n  &quot;type&quot;: &quot;function&quot;,\n  &quot;function&quot;: { ... }\n}" 
                  rows={7}
                ></textarea>
                {formErrors.json && <p className="text-[10px] text-error mt-1">{formErrors.json}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="input-tool-instruction">Execution Instruction</label>
                <textarea 
                  id="input-tool-instruction" 
                  value={formInstruction}
                  onChange={e => setFormInstruction(e.target.value)}
                  className="w-full bg-surface-container border border-surface-container-high rounded text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition p-3 resize-y leading-relaxed" 
                  placeholder="Describe when and how Maya AI should trigger this tool..." 
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="px-6 py-3.5 border-t border-surface-container-high bg-surface-container flex items-center justify-end gap-2">
              <button 
                className="px-4 py-2 rounded text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
                onClick={closeModal} 
                type="button"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-xs font-semibold rounded shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50" 
                onClick={saveTool} 
                type="button"
                disabled={saving}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                {saving ? 'Saving...' : 'Save Tool'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {toolToDelete && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm pt-24">
          <div className="bg-surface-container-low border border-surface-container-high rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in slide-in-from-top-10 duration-200 text-on-surface">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[28px]">warning</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface mb-2">Delete Tool?</h2>
              <p className="text-sm text-on-surface-variant">
                Are you sure you want to delete this tool? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-4 border-t border-surface-container-high bg-surface-container flex justify-end gap-3">
              <button 
                onClick={() => setToolToDelete(null)}
                className="px-4 py-2 rounded-lg hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                onClick={executeDeleteTool}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
