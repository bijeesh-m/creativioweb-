"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import {
    LuPlus,
    LuCloudUpload,
    LuPencil,
    LuTrash2,
    LuX,
    LuMaximize2
} from "react-icons/lu";

export default function WorksManager() {
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingWork, setEditingWork] = useState<any>(null);
    const [formData, setFormData] = useState({ title: "", categories: "[]", tags: "", description: "", client: "", tall: false, featured: false, isPublished: true });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [mediaType, setMediaType] = useState("image");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [selectedWorkForView, setSelectedWorkForView] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { loadWorks(); }, []);

    const loadWorks = async () => {
        try { const res = await api.getWorks(); setWorks(res.data); }
        catch (err: any) { setError(err.message); }
        finally { setLoading(false); }
    };

    const resetForm = () => {
        setFormData({ title: "", categories: "[]", tags: "", description: "", client: "", tall: false, featured: false, isPublished: true });
        setImageFile(null); setImagePreview(""); setMediaType("image"); setEditingWork(null); setShowForm(false); setError("");
    };

    const handleEdit = (work: any) => {
        setEditingWork(work);
        setFormData({ title: work.title, categories: JSON.stringify(work.categories || []), tags: work.tags || "", description: work.description || "", client: work.client || "", tall: work.tall || false, featured: work.featured || false, isPublished: work.isPublished !== false });
        setImagePreview(work.image?.url || "");
        setMediaType(work.image?.mediaType || "image");
        setShowForm(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
        }
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
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                    <LuPlus size={18} /> Add Work
                </button>
            </div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            {showForm && (
                <div className="admin-modal-overlay" onClick={() => resetForm()}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editingWork ? "Edit Work" : "Add New Work"}</h3>
                            <button className="admin-modal-close" onClick={resetForm}><LuX /></button>
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
                                <label>Media (Image or Video) {!editingWork && "*"}</label>
                                {imagePreview && (
                                    <div className="admin-media-preview-container">
                                        {mediaType === 'video' ? (
                                            <video
                                                src={imagePreview}
                                                className="admin-image-preview"
                                                controls
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="admin-image-preview"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}
                                        <button
                                            type="button"
                                            className="admin-remove-media"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageFile(null);
                                                setImagePreview("");
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                                <div
                                    className={`admin-file-upload ${imagePreview ? 'has-preview' : ''}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="admin-file-placeholder">
                                        <LuCloudUpload size={32} />
                                        <p>{imagePreview ? "Change Media" : "Click to upload"}</p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleImageChange} hidden />
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
                                <td>
                                    {work.image?.url ? (
                                        <div
                                            className="admin-table-thumb-clickable"
                                            onClick={() => setSelectedWorkForView(work)}
                                            title="Click to view"
                                        >
                                            {work.image?.mediaType === 'video' ? (
                                                <video
                                                    src={work.image.url}
                                                    className="admin-table-thumb"
                                                    muted
                                                    onMouseOver={(e) => e.currentTarget.play()}
                                                    onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                                />
                                            ) : (
                                                <img src={work.image.url} alt={work.title} className="admin-table-thumb" />
                                            )}
                                            <div className="admin-thumb-overlay">
                                                <LuMaximize2 size={20} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="admin-table-thumb-placeholder" />
                                    )}
                                </td>
                                <td><strong>{work.title}</strong><br /><small>{work.tags}</small></td>
                                <td><div className="admin-tags">{work.categories?.filter((c: string) => c !== "All Projects").map((c: string) => <span key={c} className="admin-tag">{c}</span>)}</div></td>
                                <td><span className={`admin-badge ${work.featured ? "badge-success" : "badge-muted"}`}>{work.featured ? "Yes" : "No"}</span></td>
                                <td><span className={`admin-badge ${work.isPublished ? "badge-success" : "badge-warning"}`}>{work.isPublished ? "Published" : "Draft"}</span></td>
                                <td>
                                    <div className="admin-actions">
                                        <button className="admin-btn-icon" onClick={() => handleEdit(work)} title="Edit">
                                            <LuPencil size={18} />
                                        </button>
                                        <button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(work._id)} title="Delete">
                                            <LuTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {works.length === 0 && <tr><td colSpan={6} className="admin-empty-text">No works found. Create your first work!</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Image/Video View Popup */}
            {selectedWorkForView && (
                <div className="admin-modal-overlay viewer" onClick={() => setSelectedWorkForView(null)}>
                    <div className="admin-viewer-card" onClick={(e) => e.stopPropagation()}>
                        <button className="admin-viewer-close" onClick={() => setSelectedWorkForView(null)}><LuX /></button>
                        <div className="admin-viewer-media">
                            {selectedWorkForView.image?.mediaType === 'video' ? (
                                <video src={selectedWorkForView.image.url} controls autoPlay />
                            ) : (
                                <img src={selectedWorkForView.image.url} alt={selectedWorkForView.title} />
                            )}
                        </div>
                        <div className="admin-viewer-info">
                            <h4>{selectedWorkForView.title}</h4>
                            <p>{selectedWorkForView.client || "No client specified"}</p>
                            <div className="admin-tags">
                                {selectedWorkForView.categories?.map((c: string) => (
                                    <span key={c} className="admin-tag">{c}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
