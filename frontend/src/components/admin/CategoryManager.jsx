import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, CheckCircle2, RotateCcw, LayoutGrid, Upload } from 'lucide-react';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({ name: category.name, description: category.description || '', image: category.image || '' });
    } else {
      setCurrentCategory(null);
      setFormData({ name: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

   const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check file size (Max 1MB)
    const maxSize = 1 * 1024 * 1024;
    if (files[0].size > maxSize) {
      alert("Image size 1MB se zyada hai. Kripya 1MB se kam ki image upload karein.");
      e.target.value = ''; // Reset input
      return;
    }

    setUploading(true);
    const data = new FormData();
    for (const file of files) {
      data.append('images', file);
    }

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        const result = await res.json();
        setFormData(prev => ({ ...prev, image: result.filePaths[0] }));
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!currentCategory;
    const url = isEditing ? `http://localhost:5000/api/categories/${currentCategory._id}` : 'http://localhost:5000/api/categories';
    
    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert(err.message || 'Error processing category');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? Products using this category will remain, but you won\'t be able to select this category anymore.')) {
      try {
        const res = await fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' });
        if (res.ok) fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] border border-secondary/5 shadow-sm">
        <div>
          <h3 className="text-xl font-black text-content font-display">Category Management</h3>
          <p className="text-xs font-bold text-content/30 uppercase tracking-widest mt-1">Organize your spice collections</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-content/30" size={16} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 bg-surface border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20" 
            />
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-content transition-all shadow-lg shadow-secondary/20 active:scale-95 text-xs"
          >
            <Plus size={16} /> New Category
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <div key={cat._id} className="bg-white p-6 rounded-[2.5rem] border border-secondary/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary overflow-hidden">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <LayoutGrid size={24} />
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(cat)} 
                    className="p-2 bg-surface hover:bg-secondary hover:text-white rounded-lg transition-all"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(cat._id)} 
                    className="p-2 bg-surface hover:bg-red-500 hover:text-white rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h4 className="text-lg font-bold text-content">{cat.name}</h4>
              <p className="text-xs text-content/40 mt-2 line-clamp-2">{cat.description || 'No description provided.'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-content/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg animate-in zoom-in duration-300">
             <div className="p-6 border-b border-secondary/5 flex justify-between items-center bg-surface/30">
                <h3 className="font-black font-display text-content text-lg uppercase tracking-tight">{currentCategory ? 'Update Category' : 'Create Category'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-content/30 transition-all"><Plus className="rotate-45" /></button>
             </div>
             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Category Name</label>
                   <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" 
                    placeholder="e.g. Whole Spices"
                    required 
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Description</label>
                   <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm min-h-[100px] resize-none focus:ring-2 focus:ring-secondary/20" 
                    placeholder="Brief description of this collection..."
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Category Image</label>
                   <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-surface rounded-2xl overflow-hidden border-2 border-dashed border-secondary/20 flex items-center justify-center">
                         {formData.image ? (
                            <img src={formData.image} className="w-full h-full object-cover" />
                         ) : (
                            <Upload className="text-secondary/30" size={24} />
                         )}
                      </div>
                      <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${uploading ? 'bg-secondary/20 text-secondary cursor-wait' : 'cursor-pointer bg-secondary/5 hover:bg-secondary/10 text-secondary'}`}>
                         {uploading ? (
                            <>
                               <div className="w-3 h-3 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                               Uploading...
                            </>
                         ) : (
                            'Upload Image'
                         )}
                         <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
                      </label>
                   </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-content/40 hover:text-content">Cancel</button>
                   <button type="submit" className="bg-secondary text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:bg-content transition-all focus:scale-95">Save Category</button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
