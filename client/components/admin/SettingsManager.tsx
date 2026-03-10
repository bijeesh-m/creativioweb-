"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function SettingsManager() {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editedValues, setEditedValues] = useState<Record<string, string>>({});

    useEffect(() => { load(); }, []);
    const load = async () => { try { const r = await api.getSettings(); setSettings(r.data); setEditedValues({}); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };

    const handleChange = (key: string, value: string) => { setEditedValues({ ...editedValues, [key]: value }); };

    const handleSave = async (setting: any) => {
        setSaving(true); setError(""); setSuccess("");
        try {
            await api.upsertSetting({ ...setting, value: editedValues[setting.key] ?? setting.value });
            setSuccess(`"${setting.label || setting.key}" updated!`); load();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    const [newSetting, setNewSetting] = useState({ key: "", value: "", type: "text", group: "general", label: "" });
    const [showAdd, setShowAdd] = useState(false);

    const handleAddSetting = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try { await api.upsertSetting(newSetting); setNewSetting({ key: "", value: "", type: "text", group: "general", label: "" }); setShowAdd(false); load(); }
        catch (err: any) { setError(err.message); } finally { setSaving(false); }
    };

    if (loading) return <div className="admin-loading">Loading settings...</div>;

    const groups = ["general", "hero", "about", "contact", "social", "seo", "footer"];
    const grouped: Record<string, any[]> = {};
    settings.forEach((s) => { const g = s.group || "general"; if (!grouped[g]) grouped[g] = []; grouped[g].push(s); });

    return (
        <div className="admin-manager">
            <div className="admin-manager-header"><h2>Site Settings</h2><button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Add Setting</button></div>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            {success && <div className="admin-alert admin-alert-success">{success}</div>}
            {showAdd && (
                <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
                    <form onSubmit={handleAddSetting} className="admin-form">
                        <div className="admin-form-grid">
                            <div className="admin-input-group"><label>Key *</label><input type="text" value={newSetting.key} onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })} required placeholder="setting_key" /></div>
                            <div className="admin-input-group"><label>Label</label><input type="text" value={newSetting.label} onChange={(e) => setNewSetting({ ...newSetting, label: e.target.value })} /></div>
                            <div className="admin-input-group"><label>Group</label><select value={newSetting.group} onChange={(e) => setNewSetting({ ...newSetting, group: e.target.value })}>{groups.map((g) => <option key={g} value={g}>{g}</option>)}</select></div>
                            <div className="admin-input-group"><label>Type</label><select value={newSetting.type} onChange={(e) => setNewSetting({ ...newSetting, type: e.target.value })}>{["text", "textarea", "url", "image", "boolean", "number", "json"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
                        </div>
                        <div className="admin-input-group"><label>Value *</label><textarea rows={2} value={newSetting.value} onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })} required /></div>
                        <div className="admin-form-actions"><button type="button" className="admin-btn admin-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button><button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>Add Setting</button></div>
                    </form>
                </div>
            )}
            {groups.filter((g) => grouped[g]?.length).map((group) => (
                <div key={group} className="admin-settings-group">
                    <h3 className="admin-settings-group-title">{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                    <div className="admin-card">
                        {grouped[group].map((s: any) => (
                            <div key={s._id} className="admin-setting-row">
                                <div className="admin-setting-info"><label>{s.label || s.key}</label><small>{s.key} ({s.type})</small></div>
                                <div className="admin-setting-value">
                                    {s.type === "textarea" ? <textarea rows={2} defaultValue={s.value} onChange={(e) => handleChange(s.key, e.target.value)} /> : <input type={s.type === "url" ? "url" : s.type === "number" ? "number" : "text"} defaultValue={s.value} onChange={(e) => handleChange(s.key, e.target.value)} />}
                                </div>
                                <button className="admin-btn admin-btn-sm" onClick={() => handleSave(s)} disabled={saving}>Save</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
