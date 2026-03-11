"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
    LuPlus,
    LuPencil,
    LuTrash2,
    LuX
} from "react-icons/lu";

export default function CategoriesManager() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", description: "", order: 0, isActive: true });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => { load(); }, []);
    const load = async () => { try { const r = await api.getCategories(); setItems(r.data); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };
    const resetForm = () => { setFormData({ name: "", description: "", order: 0, isActive: true }); setEditing(null); setShowForm(false); setError(""); };
    const handleEdit = (c: any) => { setEditing(c); setFormData({ name: c.name, description: c.description || "", order: c.order || 0, isActive: c.isActive !== false }); setShowForm(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError("");
        try {
            if (editing) await api.updateCategory(editing._id, formData); else await api.createCategory(formData);
            resetForm(); load();
        } catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => { if (!confirm("Delete this category?")) return; try { await api.deleteCategory(id); load(); } catch (e: any) { setError(e.message); } };

    if (loading) return <div className="admin-loading">Loading categories...</div>;

    return (
        <div className="admin-manager">
            <div className="admin-manager-header">
                <h2>Categories</h2>
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                    <LuPlus size={18} /> Add Category
                </button>
            </div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {showForm && (
                <div className="admin-modal-overlay" onClick={resetForm}>
                    <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>{editing ? "Edit Category" : "Add Category"}</h3>
                            <button className="admin-modal-close" onClick={resetForm}><LuX /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-input-group"><label>Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                            <div className="admin-input-group"><label>Description</label><textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
                            <div className="admin-input-group"><label>Order</label><input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })} /></div>
                            <label className="admin-checkbox"><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} /><span>Active</span></label>
                            <div className="admin-form-actions"><button type="button" className="admin-btn admin-btn-ghost" onClick={resetForm}>Cancel</button><button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button></div>
                        </form>
                    </div>
                </div>
            )}
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead><tr><th>Name</th><th>Slug</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>{items.map((c) => (
                        <tr key={c._id}>
                            <td><strong>{c.name}</strong></td>
                            <td><code>{c.slug}</code></td>
                            <td>{c.order}</td>
                            <td><span className={`admin-badge ${c.isActive ? "badge-success" : "badge-muted"}`}>{c.isActive ? "Active" : "Inactive"}</span></td>
                            <td>
                                <div className="admin-actions">
                                    <button className="admin-btn-icon" onClick={() => handleEdit(c)}>
                                        <LuPencil size={18} />
                                    </button>
                                    <button className="admin-btn-icon admin-btn-danger" onClick={() => handleDelete(c._id)}>
                                        <LuTrash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}{items.length === 0 && <tr><td colSpan={5} className="admin-empty-text">No categories yet.</td></tr>}</tbody>
                </table>
            </div>
        </div>
    );
}
