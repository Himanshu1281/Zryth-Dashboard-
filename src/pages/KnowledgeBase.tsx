import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../config/supabase';

export function KnowledgeBase() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('knowledge_base').list();
      if (error) throw error;
      
      // Filter out the empty placeholder file that Supabase creates sometimes (e.g., .emptyFolderPlaceholder)
      const validFiles = data?.filter(f => f.name !== '.emptyFolderPlaceholder' && f.name !== '.DS_Store') || [];
      
      // Sort by created_at descending
      validFiles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setFiles(validFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit.');
      return;
    }

    try {
      setUploading(true);
      
      // Sanitize file name
      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${Date.now()}_${fileName}`;

      const { error } = await supabase.storage
        .from('knowledge_base')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      await fetchFiles();
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert(error.message || 'Error uploading file.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${fileName}?`)) return;

    try {
      // Delete the actual PDF file from the Storage bucket.
      const { error } = await supabase.storage
        .from('knowledge_base')
        .remove([fileName]);

      if (error) throw error;
      
      await fetchFiles();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      alert(error.message || 'Error deleting file.');
    }
  };

  const handleView = async (fileName: string) => {
    try {
      // First try to get signed URL (works for private buckets)
      const { data, error } = await supabase.storage
        .from('knowledge_base')
        .createSignedUrl(fileName, 60 * 5); // 5 mins

      if (error && error.message === 'Bucket is public') {
        // Fallback to public URL if bucket is public
        const { data: publicData } = supabase.storage
          .from('knowledge_base')
          .getPublicUrl(fileName);
        window.open(publicData.publicUrl, '_blank');
        return;
      }

      if (error) throw error;
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  // Convert bytes to MB
  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (uploading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Manually trigger the same logic by spoofing the event
      if (fileInputRef.current) {
        // Create a DataTransfer object to assign to the file input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        
        // Trigger change manually
        const event = { target: { files: dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileUpload(event);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Layout disablePadding={true} title="Knowledge Base - Zryth AI Voice">
      <div 
        className="p-4 sm:p-8 space-y-6 max-w-[1440px] mx-auto w-full min-h-full"
        style={{ background: 'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
      >
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Base</h1>
            <p className="text-sm text-neutral-400 mt-0.5">Upload and manage documents for your AI to learn from.</p>
          </div>
        </section>

        {/* Upload Section */}
        <section 
          className={`bg-[#1c1b1c] border rounded-xl p-8 text-center border-dashed transition-colors duration-300 cursor-pointer group ${uploading ? 'border-primary/50 bg-primary/5 cursor-not-allowed' : 'border-[rgba(255,255,255,0.08)] hover:border-neutral-700'}`}
          onClick={!uploading ? triggerFileInput : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".pdf" 
            className="hidden" 
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
              {uploading ? (
                 <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
              ) : (
                <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">cloud_upload</span>
              )}
            </div>
            <h3 className="font-headline-md text-2xl font-bold text-on-surface">
              {uploading ? 'Uploading Document...' : 'Drag and Drop PDF here'}
            </h3>
            <p className="font-body-md text-base text-on-surface-variant max-w-md mx-auto">
              {uploading 
                ? 'Please wait while we sync the file to your backend.' 
                : 'Supports PDF files up to 50MB. Documents are automatically synced to the Supabase backend.'}
            </p>
            {!uploading && (
              <button className="mt-4 bg-transparent border border-white/15 text-on-surface px-6 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider hover:bg-white/5 transition-colors font-semibold">
                Browse Files
              </button>
            )}
          </div>
        </section>

        {/* Document Table */}
        <section className="space-y-4">
          <h3 className="font-headline-md text-2xl font-bold text-on-surface">Uploaded Documents</h3>
          <div className="bg-[#1c1b1c] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden min-h-[200px]">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-neutral-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">description</span>
                <p className="text-sm">No documents found in knowledge_base bucket.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-lowest/50">
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Document Name</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Upload Date</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Status</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold">Size</th>
                    <th className="py-4 px-6 font-label-md text-xs text-on-surface-variant opacity-50 uppercase tracking-wider font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-sm text-on-surface">
                  {files.map((file) => (
                    <tr key={file.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-outline">description</span>
                        <span className="truncate max-w-[300px]" title={file.name}>{file.name}</span>
                      </td>
                      <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">
                        {new Date(file.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container/20 text-tertiary border border-tertiary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          Ready
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono-label text-[13px] text-on-surface-variant">
                        {formatSize(file.metadata?.size || 0)}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button 
                          onClick={() => handleView(file.name)}
                          className="text-outline hover:text-primary transition-colors opacity-50 group-hover:opacity-100"
                          title="View PDF"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(file.name)}
                          className="text-outline hover:text-error transition-colors opacity-50 group-hover:opacity-100"
                          title="Delete PDF"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
