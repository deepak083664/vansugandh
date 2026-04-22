import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Upload, CheckCircle2, RotateCcw, Package, Store, X } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('retail');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '', price: '', oldPrice: '', category: '', tag: '', image: '', images: [], rating: '5', description: '', weight: '', origin: '',
    variants: [],
    isWholesale: false, wholesalePrice: '', minWholesaleQty: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('http://localhost:5000/api/products'),
        fetch('http://localhost:5000/api/categories')
      ]);
      
      if (prodRes.ok) {
        setProducts(await prodRes.json());
      }
      if (catRes.ok) {
        setCategories(await catRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { weight: '', price: '', oldPrice: '' }]
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData(prev => ({ ...prev, variants: updatedVariants }));
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== indexToRemove);
      let newMainImage = prev.image;
      
      // If the image we're removing is the main thumbnail
      if (prev.image === prev.images[indexToRemove]) {
        newMainImage = newImages.length > 0 ? newImages[0] : '';
      }
      
      return {
        ...prev,
        images: newImages,
        image: newMainImage
      };
    });
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name, price: product.price, oldPrice: product.oldPrice || '',
        category: product.category, tag: product.tag || '', image: product.image || '',
        images: product.images || [],
        rating: product.rating || '5', description: product.description || '',
        weight: product.weight || '', origin: product.origin || '',
        variants: product.variants || [],
        isWholesale: product.isWholesale || false,
        wholesalePrice: product.wholesalePrice || '',
        minWholesaleQty: product.minWholesaleQty || ''
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '', price: '', oldPrice: '', category: '', tag: '', image: '', images: [], rating: '5', description: '', weight: '', origin: '',
        variants: [],
        isWholesale: activeTab === 'wholesale',
        wholesalePrice: '', minWholesaleQty: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    const data = new FormData();
    files.forEach(file => data.append('images', file));
    try {
      const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: data });
      if (res.ok) {
        const { filePaths } = await res.json();
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...filePaths],
          image: prev.image || filePaths[0]
        }));
      }
    } catch (err) { console.error(err); } finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!currentProduct;
    const url = isEditing ? `http://localhost:5000/api/products/${currentProduct._id}` : 'http://localhost:5000/api/products';
    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) fetchData();
      } catch (err) { console.error(err); }
    }
  };

  const filteredProducts = products.filter(p => 
    (activeTab === 'retail' ? !p.isWholesale : p.isWholesale) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] border border-secondary/5 shadow-sm">
        <div className="flex bg-surface p-1 rounded-xl border border-secondary/10">
           {['retail', 'wholesale'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-white text-secondary shadow-sm' : 'text-content/40 hover:text-content'}`}>
                {tab}
             </button>
           ))}
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-content/30" size={16} />
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-surface border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20" />
          </div>
          <button onClick={() => handleOpenModal()} className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-content transition-all shadow-lg shadow-secondary/20 active:scale-95 text-xs">
            <Plus size={16} /> New Item
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-secondary/5 shadow-xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-surface/50 border-b border-secondary/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Product</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40">Price</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-content/40 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filteredProducts.map(p => (
                  <tr key={p._id} className="hover:bg-surface/30 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image || '/logo.jpeg'} alt="" className="w-12 h-12 rounded-xl object-cover border border-secondary/10" />
                        <div>
                          <h4 className="font-bold text-content text-sm">{p.name}</h4>
                          <p className="text-[10px] text-content/30">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-content/60">{p.category}</td>
                    <td className="px-8 py-4 font-black text-content">₹{p.price}</td>
                    <td className="px-8 py-4 text-right">
                       <div className="flex justify-end gap-2 transition-all">
                         <button 
                            onClick={() => handleOpenModal(p)} 
                            className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl border border-blue-100 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider"
                            title="Edit Product"
                         >
                            <Edit2 size={14} /> 
                            <span className="hidden xl:inline">Edit</span>
                         </button>
                         <button 
                            onClick={() => handleDeleteProduct(p._id)} 
                            className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border border-red-100 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider"
                            title="Delete Product"
                         >
                            <Trash2 size={14} />
                            <span className="hidden xl:inline">Delete</span>
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-content/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-300">
             <div className="p-4 md:p-6 border-b border-secondary/5 flex justify-between items-center bg-surface/30">
                <h3 className="font-black font-display text-content text-lg uppercase tracking-tight">{currentProduct ? 'Update Item' : 'Create Item'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-content/30 transition-all"><Plus className="rotate-45" /></button>
             </div>
             <div className="overflow-y-auto p-5 md:p-8 no-scrollbar">
                <form id="prodForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                   <div className="col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" required />
                   </div>
                   {/* Simplified for brevity while keeping core logic */}
                   <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Price (₹)</label>
                      <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm" required />
                   </div>
                   <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Category</label>
                      <select 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20" 
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                   </div>

                   <div className="col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Product Description</label>
                       <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm min-h-[100px] resize-none" placeholder="Detailed product description..." required></textarea>
                   </div>

                   <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Weight (Base)</label>
                       <input type="text" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm" placeholder="e.g. 250g" />
                   </div>
                   <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Origin</label>
                       <input type="text" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm" placeholder="e.g. India" />
                   </div>

                   {formData.isWholesale && (
                     <>
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Wholesale Price (₹)</label>
                           <input type="number" value={formData.wholesalePrice} onChange={(e) => setFormData({...formData, wholesalePrice: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm" required={formData.isWholesale} />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-2 block">Min Wholesale Qty</label>
                           <input type="number" value={formData.minWholesaleQty} onChange={(e) => setFormData({...formData, minWholesaleQty: e.target.value})} className="w-full bg-surface border-none rounded-xl px-4 py-3 text-sm" required={formData.isWholesale} />
                        </div>
                     </>
                   )}

                   <div className="col-span-2 p-6 bg-surface rounded-[2rem] border border-secondary/5 space-y-6">
                      <div className="flex justify-between items-center">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-content/40">Product Variants (Weight-based Pricing)</h4>
                         <button type="button" onClick={handleAddVariant} className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-content transition-colors flex items-center gap-1">
                            <Plus size={12} /> Add Variant
                         </button>
                      </div>
                      
                      {formData.variants.length === 0 ? (
                        <p className="text-xs text-center text-content/20 italic py-4">No variants added. Base price will be used.</p>
                      ) : (
                        <div className="space-y-4">
                            {formData.variants.map((variant, idx) => (
                             <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end bg-white p-4 rounded-2xl shadow-sm border border-secondary/5 group relative">
                                <button type="button" onClick={() => handleRemoveVariant(idx)} className="absolute top-2 right-2 p-2 text-content/20 hover:text-red-500 transition-colors sm:hidden">
                                   <Trash2 size={16} />
                                </button>
                                <div>
                                   <label className="text-[8px] font-black uppercase tracking-widest text-content/30 mb-1.5 block">Weight (e.g. 100g)</label>
                                   <input type="text" value={variant.weight} onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)} className="w-full bg-surface border-none rounded-lg px-3 py-2 text-xs" placeholder="100g" required />
                                </div>
                                <div>
                                   <label className="text-[8px] font-black uppercase tracking-widest text-content/30 mb-1.5 block">Price (₹)</label>
                                   <input type="number" value={variant.price} onChange={(e) => handleVariantChange(idx, 'price', e.target.value)} className="w-full bg-surface border-none rounded-lg px-3 py-2 text-xs" placeholder="150" required />
                                </div>
                                <div className="flex items-center gap-2">
                                   <div className="flex-1">
                                      <label className="text-[8px] font-black uppercase tracking-widest text-content/30 mb-1.5 block">Old Price</label>
                                      <input type="number" value={variant.oldPrice} onChange={(e) => handleVariantChange(idx, 'oldPrice', e.target.value)} className="w-full bg-surface border-none rounded-lg px-3 py-2 text-xs" placeholder="200" />
                                   </div>
                                   <button type="button" onClick={() => handleRemoveVariant(idx)} className="hidden sm:flex p-2 text-content/20 hover:text-red-500 transition-colors">
                                      <Trash2 size={14} />
                                   </button>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                   <div className="col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-content/30 mb-4 block">Images</label>
                       <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                          {formData.images.map((img, i) => (
                             <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${formData.image === img ? 'border-secondary' : 'border-transparent'}`}>
                                <img 
                                   src={img} 
                                   className="w-full h-full object-cover cursor-pointer" 
                                   onClick={() => setFormData({...formData, image: img})}
                                   alt={`Product ${i}`}
                                />
                                <button 
                                   type="button" 
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(i);
                                   }}
                                   className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-red-500 hover:text-white rounded-full transition-all text-red-500 shadow-sm"
                                   title="Remove image"
                                >
                                   <X size={12} />
                                </button>
                             </div>
                          ))}
                          <label className={`aspect-square flex items-center justify-center border-2 border-dashed border-secondary/20 rounded-xl transition-all ${uploading ? 'bg-surface animate-pulse' : 'cursor-pointer hover:bg-surface'}`}>
                             <input type="file" multiple className="hidden" onChange={handleFileChange} disabled={uploading} />
                             {uploading ? (
                                <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                             ) : (
                                <Upload size={18} className="text-secondary" />
                             )}
                          </label>
                       </div>
                   </div>
                </form>
             </div>
             <div className="p-6 border-t border-secondary/5 bg-surface/30 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-content/40 hover:text-content">Cancel</button>
                <button type="submit" form="prodForm" className="bg-secondary text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:bg-content transition-all">Save Changes</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
