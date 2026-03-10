"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

export default function WorksManager() {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingWork, setEditingWork] = useState<any>(null);
    const [formData, setFormData] = useState({ title: "", categories: "[]", tags: "", description: "", client: "", tall: false, featured: false, isPublished: true });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { loadWorks(); }, []);

    const loadWorks = async () => {
        try { const res = await api.getWorks(); setWorks(res.data); }
        catch (err: any) { setError(err.message); }
        finally { setLoading(false); }
    };

    const resetForm = () => {
        setFormData({ title: "", categories: "[]", tags: "", description: "", client: "", tall: false, featured: false, isPublished: true });
        setImageFile(null); setImagePreview(""); setEditingWork(null); setShowForm(false); setError("");
    };

    const handleEdit = (work: any) => {
        setEditingWork(work);
        setFormData({ title: work.title, categories: JSON.stringify(work.categories || []), tags: work.tags || "", description: work.description || "", client: work.client || "", tall: work.tall || false, featured: work.featured || false, isPublished: work.isPublished !== false });
        setImagePreview(work.image?.url || "");
        setShowForm(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const fd = new FormData();
            fd.append("title", formData.title);
            fd.append("categories", formData.categories);
            fd.append("tags", formData.tags);
            fd.append("description", formData.description);
            fd.append("client", formData.client);
            fd.append("tall", String(formData.tall));
            fd.append("featured", String(formData.featured));
            fd.append("isPublished", String(formData.isPublished));
            if (imageFile) fd.append("image", imageFile);

            if (editingWork) { await api.updateWork(editingWork._id, fd); }
            else { await api.createWork(fd); }
            resetForm(); loadWorks();
        } catch (err: any) { setError(err.message); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this work?")) return;
        try { await api.deleteWork(id); loadWorks(); }
        catch (err: any) { setError(err.message); }
    };

    if (loading) return <div className="admin-loading">Loading works...</div>;

    return (
        <div className="admin-manager">
            <div className="admin-manager-header">
                <h2>Works / Projects</h2>
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>+ Add Work</button>
            </div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => resetForm()}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingWork ? "Edit Work" : "Add New Work"}</h3>
                            <button className="admin-modal-close" onClick={resetForm}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-grid">
                                <div className="admin-input-group"><label>Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                                <div className="admin-input-group"><label>Tags</label><input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="SEO · DIGITAL MARKETING" /></div>
                                <div className="admin-input-group"><label>Client</label><input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} /></div>
                                <div className="admin-input-group"><label>Categories (JSON)</label><input type="text" value={formData.categories} onChange={(e) => setFormData({ ...formData, categories: e.target.value })} placeholder='["Digital Marketing", "Branding"]' /></div>
                            </div>
                            <div className="admin-input-group"><label>Description</label><textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                            <div className="admin-input-group">
                                <label>Image {!editingWork && "*"}</label>
                                <div className="admin-file-upload" onClick={() => fileInputRef.current?.click()}>
                                    {imagePreview ? <img src={imagePreview} alt="Preview" className="admin-image-preview" /> : <div className="admin-file-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><p>Click to upload</p></div>}
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} hidden />
                                </div>
                            </div>
                            <div className="admin-checkbox-group">
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.tall} onChange={(e) => setFormData({ ...formData, tall: e.target.checked })} /><span>Tall layout</span></label>
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} /><span>Featured</span></label>
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} /><span>Published</span></label>
                            </div>
                            <div className="admin-form-actions">
                                <button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? "Saving..." : editingWork ? "Update Work" : "Create Work"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Image</th><th>Title</th><th>Categories</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {works.map((work) => (
                            <tr key={work._id}>
                                <td>{work.image?.url ? <img src={work.image.url} alt={work.title} className="admin-table-thumb" /> : <div className="admin-table-thumb-placeholder" />}</td>
                                <td><strong>{work.title}</strong><br /><small>{work.tags}</small></td>
                                <td><div className="admin-tags">{work.categories?.filter((c: string) => c !== "All Projects").map((c: string) => <span key={c} className="admin-tag">{c}</span>)}</div></td>
                                <td><span className={`admin-badge ${work.featured ? "badge-success" : "badge-muted"}`}>{work.featured ? "Yes" : "No"}</span></td>
                                <td><span className={`admin-badge ${work.isPublished ? "badge-success" : "badge-warning"}`}>{work.isPublished ? "Published" : "Draft"}</span></td>
                                <td><div className="admin-actions"><button className="admin-btn-icon" onClick={() => handleEdit(work)} title="Edit">✏️</button><button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(work._id)} title="Delete">🗑️</button></div></td>
                            </tr>
                        ))}
                        {works.length === 0 && <tr><td colSpan={6} className="admin-empty-text">No works found. Create your first work!</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
