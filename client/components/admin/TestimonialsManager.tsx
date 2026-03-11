"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import {
    LuPlus,
    LuPencil,
    LuTrash2,
    LuX,
    LuUser
} from "react-icons/lu";

export default function TestimonialsManager() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({ clientName: "", company: "", role: "", content: "", rating: 5, featured: false, isPublished: true });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => { load(); }, []);
    const load = async () => { try { const r = await api.getTestimonials(); setItems(r.data); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };

    const resetForm = () => { setFormData({ clientName: "", company: "", role: "", content: "", rating: 5, featured: false, isPublished: true }); setAvatarFile(null); setAvatarPreview(""); setEditing(null); setShowForm(false); setError(""); };

    const handleEdit = (t: any) => { setEditing(t); setFormData({ clientName: t.clientName, company: t.company || "", role: t.role || "", content: t.content, rating: t.rating || 5, featured: t.featured || false, isPublished: t.isPublished !== false }); setAvatarPreview(t.avatar?.url || ""); setShowForm(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
            if (avatarFile) fd.append("avatar", avatarFile);
            if (editing) await api.updateTestimonial(editing._id, fd); else await api.createTestimonial(fd);
            resetForm(); load();
        } catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => { if (!confirm("Delete this testimonial?")) return; try { await api.deleteTestimonial(id); load(); } catch (e: any) { setError(e.message); } };

    if (loading) return <div className="admin-loading">Loading testimonials...</div>;

    return (
        <div className="admin-manager">
            <div className="admin-manager-header">
                <h2>Testimonials</h2>
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                    <LuPlus size={18} /> Add Testimonial
                </button>
            </div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {showForm && (
                <div className="admin-modal-overlay" onClick={resetForm}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? "Edit Testimonial" : "Add Testimonial"}</h3>
                            <button className="admin-modal-close" onClick={resetForm}><LuX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-grid">
                                <div className="admin-input-group"><label>Client Name *</label><input type="text" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required /></div>
                                <div className="admin-input-group"><label>Company</label><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></div>
                                <div className="admin-input-group"><label>Role</label><input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></div>
                                <div className="admin-input-group"><label>Rating</label><select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{"★".repeat(r)}{"☆".repeat(5 - r)}</option>)}</select></div>
                            </div>
                            <div className="admin-input-group"><label>Content *</label><textarea rows={4} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required /></div>
                            <div className="admin-input-group">
                                <label>Avatar</label>
                                <div className="admin-file-upload small" onClick={() => fileRef.current?.click()}>
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Preview" className="admin-avatar-preview" />
                                    ) : (
                                        <div className="admin-file-placeholder">
                                            <LuUser size={24} />
                                            <p>Upload avatar</p>
                                        </div>
                                    )}
                                    <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)); } }} hidden />
                                </div>
                            </div>
                            <div className="admin-checkbox-group">
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} /><span>Featured</span></label>
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} /><span>Published</span></label>
                            </div>
                            <div className="admin-form-actions"><button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button><button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
                        </form>
                    </div>
                </div>
            )}
            <div className="admin-cards-grid">
                {items.map((t) => (
                    <div key={t._id} className="admin-testimonial-card">
                        <div className="admin-testimonial-header"><div className="admin-recent-avatar">{t.avatar?.url ? <img src={t.avatar.url} alt="" /> : t.clientName?.[0]}</div><div><strong>{t.clientName}</strong><br /><small>{t.role} at {t.company}</small></div></div>
                        <p className="admin-testimonial-content">"{t.content}"</p>
                        <div className="admin-testimonial-footer">
                            <span className="admin-stars">{"★".repeat(t.rating || 5)}</span>
                            <div className="admin-item-card-actions">
                                <button className="admin-btn-icon" onClick={() => handleEdit(t)}><LuPencil size={18} /></button>
                                <button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(t._id)}><LuTrash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p className="admin-empty-text">No testimonials yet.</p>}
            </div>
        </div>
    );
}
