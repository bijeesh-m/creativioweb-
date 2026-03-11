"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import {
    LuPlus,
    LuPencil,
    LuTrash2,
    LuX
} from "react-icons/lu";

export default function ServicesManager() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({ title: "", shortDescription: "", fullDescription: "", features: "[]", benefits: "[]", packages: "[]", imageLeft: true, isPublished: true });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => { load(); }, []);
    const load = async () => { try { const r = await api.getServices(); setItems(r.data); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };

    const resetForm = () => { setFormData({ title: "", shortDescription: "", fullDescription: "", features: "[]", benefits: "[]", packages: "[]", imageLeft: true, isPublished: true }); setImageFile(null); setHeroImageFile(null); setEditing(null); setShowForm(false); setError(""); };

    const handleEdit = (s: any) => { setEditing(s); setFormData({ title: s.title, shortDescription: s.shortDescription || "", fullDescription: s.fullDescription || "", features: JSON.stringify(s.features || []), benefits: JSON.stringify(s.benefits || []), packages: JSON.stringify(s.packages || []), imageLeft: s.imageLeft !== false, isPublished: s.isPublished !== false }); setShowForm(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
            if (imageFile) fd.append("image", imageFile);
            if (heroImageFile) fd.append("heroImage", heroImageFile);
            if (editing) await api.updateService(editing._id, fd); else await api.createService(fd);
            resetForm(); load();
        } catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => { if (!confirm("Delete this service?")) return; try { await api.deleteService(id); load(); } catch (e: any) { setError(e.message); } };

    if (loading) return <div className="admin-loading">Loading services...</div>;

    return (
        <div className="admin-manager">
            <div className="admin-manager-header">
                <h2>Services</h2>
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                    <LuPlus size={18} /> Add Service
                </button>
            </div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {showForm && (
                <div className="admin-modal-overlay" onClick={resetForm}>
                    <div className="admin-modal admin-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? "Edit Service" : "Add Service"}</h3>
                            <button className="admin-modal-close" onClick={resetForm}><LuX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-input-group"><label>Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                            <div className="admin-input-group"><label>Short Description *</label><textarea rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} required /></div>
                            <div className="admin-input-group"><label>Full Description</label><textarea rows={4} value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} /></div>
                            <div className="admin-form-grid">
                                <div className="admin-input-group"><label>Features (JSON array)</label><textarea rows={3} value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder='["Feature 1", "Feature 2"]' /></div>
                                <div className="admin-input-group"><label>Benefits (JSON array)</label><textarea rows={3} value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder='["Benefit 1", "Benefit 2"]' /></div>
                            </div>
                            <div className="admin-input-group"><label>Packages (JSON)</label><textarea rows={3} value={formData.packages} onChange={(e) => setFormData({ ...formData, packages: e.target.value })} /></div>
                            <div className="admin-form-grid">
                                <div className="admin-input-group"><label>Service Image</label><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /></div>
                                <div className="admin-input-group"><label>Hero Image</label><input type="file" accept="image/*" onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)} /></div>
                            </div>
                            <div className="admin-checkbox-group">
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.imageLeft} onChange={(e) => setFormData({ ...formData, imageLeft: e.target.checked })} /><span>Image Left</span></label>
                                <label className="admin-checkbox"><input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} /><span>Published</span></label>
                            </div>
                            <div className="admin-form-actions"><button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button><button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
                        </form>
                    </div>
                </div>
            )}
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Title</th><th>Features</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>{items.map((s) => (
                        <tr key={s._id}>
                            <td><strong>{s.title}</strong><br /><small>{s.shortDescription?.slice(0, 80)}...</small></td>
                            <td>{s.features?.length || 0} features</td>
                            <td><span className={`admin-badge ${s.isPublished ? "badge-success" : "badge-warning"}`}>{s.isPublished ? "Published" : "Draft"}</span></td>
                            <td>
                                <div className="admin-actions">
                                    <button className="admin-btn-icon" onClick={() => handleEdit(s)}>
                                        <LuPencil size={18} />
                                    </button>
                                    <button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(s._id)}>
                                        <LuTrash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}{items.length === 0 && <tr><td colSpan={4} className="admin-empty-text">No services yet.</td></tr>}</tbody>
                </table>
            </div>
        </div>
    );
}
