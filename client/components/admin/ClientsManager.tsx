"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

export default function ClientsManager() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", website: "", industry: "", description: "", featured: false });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => { loadClients(); }, []);
    const loadClients = async () => { try { const r = await api.getClients(); setClients(r.data); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };

    const resetForm = () => { setFormData({ name: "", website: "", industry: "", description: "", featured: false }); setLogoFile(null); setLogoPreview(""); setEditing(null); setShowForm(false); setError(""); };

    const handleEdit = (c: any) => { setEditing(c); setFormData({ name: c.name, website: c.website || "", industry: c.industry || "", description: c.description || "", featured: c.featured || false }); setLogoPreview(c.logo?.url || ""); setShowForm(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError("");
        try {
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
            if (logoFile) fd.append("logo", logoFile);
            if (editing) await api.updateClient(editing._id, fd); else await api.createClient(fd);
            resetForm(); loadClients();
        } catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => { if (!confirm("Delete this client?")) return; try { await api.deleteClient(id); loadClients(); } catch (e: any) { setError(e.message); } };

    if (loading) return <div className="admin-loading">Loading clients...</div>;

    return (
        <div className="admin-manager">
            <div className="admin-manager-header"><h2>Clients</h2><button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>+ Add Client</button></div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {showForm && (
                <div className="admin-modal-overlay" onClick={resetForm}><div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="admin-modal-header"><h3>{editing ? "Edit Client" : "Add Client"}</h3><button className="admin-modal-close" onClick={resetForm}>×</button></div>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="admin-form-grid">
                            <div className="admin-input-group"><label>Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                            <div className="admin-input-group"><label>Website</label><input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} /></div>
                            <div className="admin-input-group"><label>Industry</label><input type="text" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} /></div>
                        </div>
                        <div className="admin-input-group"><label>Description</label><textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                        <div className="admin-input-group"><label>Logo</label><div className="admin-file-upload" onClick={() => fileRef.current?.click()}>{logoPreview ? <img src={logoPreview} alt="Preview" className="admin-image-preview" /> : <div className="admin-file-placeholder"><p>Click to upload logo</p></div>}<input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); } }} hidden /></div></div>
                        <label className="admin-checkbox"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} /><span>Featured</span></label>
                        <div className="admin-form-actions"><button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button><button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
                    </form>
                </div></div>
            )}
            <div className="admin-cards-grid">
                {clients.map((c) => (
                    <div key={c._id} className="admin-item-card">
                        <div className="admin-item-card-img">{c.logo?.url ? <img src={c.logo.url} alt={c.name} /> : <div className="admin-item-card-placeholder">{c.name[0]}</div>}</div>
                        <div className="admin-item-card-body"><h4>{c.name}</h4><p>{c.industry}</p>{c.featured && <span className="admin-badge badge-success">Featured</span>}</div>
                        <div className="admin-item-card-actions"><button className="admin-btn-icon" onClick={() => handleEdit(c)}>✏️</button><button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(c._id)}>🗑️</button></div>
                    </div>
                ))}
                {clients.length === 0 && <p className="admin-empty-text">No clients yet.</p>}
            </div>
        </div>
    );
}
