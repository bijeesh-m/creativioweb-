"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { LuPlus, LuPencil, LuTrash2, LuUpload, LuCheck, LuX, LuLinkedin, LuTwitter, LuInstagram } from "react-icons/lu";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    image?: {
        url: string;
        key: string;
        publicId: string;
    };
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    order: number;
    isPublished: boolean;
}

export default function TeamManagement() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        order: 0,
        isPublished: true,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => { loadTeam(); }, []);

    const loadTeam = async () => {
        try {
            const res = await api.getTeamMembers();
            setTeam(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleOpenModal = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name,
                role: member.role,
                bio: member.bio || "",
                linkedin: member.socialLinks?.linkedin || "",
                twitter: member.socialLinks?.twitter || "",
                instagram: member.socialLinks?.instagram || "",
                order: member.order,
                isPublished: member.isPublished,
            });
            setPreviewUrl(member.image?.url || null);
        } else {
            setEditingMember(null);
            setFormData({
                name: "",
                role: "",
                bio: "",
                linkedin: "",
                twitter: "",
                instagram: "",
                order: team.length,
                isPublished: true,
            });
            setPreviewUrl(null);
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("role", formData.role);
        data.append("bio", formData.bio);
        data.append("socialLinks[linkedin]", formData.linkedin);
        data.append("socialLinks[twitter]", formData.twitter);
        data.append("socialLinks[instagram]", formData.instagram);
        data.append("order", formData.order.toString());
        data.append("isPublished", formData.isPublished.toString());

        if (imageFile) data.append("image", imageFile);

        try {
            setLoading(true);
            if (editingMember) {
                await api.updateTeamMember(editingMember._id, data);
            } else {
                await api.createTeamMember(data);
            }
            setIsModalOpen(false);
            loadTeam();
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;
        try {
            setLoading(true);
            await api.deleteTeamMember(id);
            loadTeam();
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    if (loading && !team.length) return <div className="admin-loading">Loading team...</div>;

    return (
        <div className="admin-section">
            <div className="admin-section-header">
                <div>
                    <h2 className="admin-section-title">Team Management</h2>
                    <p className="admin-section-subtitle">Manage your agency team members</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => handleOpenModal()}>
                    <LuPlus size={18} /> Add Member
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Role</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((member) => (
                            <tr key={member._id}>
                                <td>
                                    <div className="admin-table-item">
                                        <div className="admin-table-thumb">
                                            {member.image?.url ? (
                                                <img src={member.image.url} alt={member.name} />
                                            ) : (
                                                <div className="admin-table-avatar">{member.name[0]}</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="admin-table-name">{member.name}</div>
                                            <div className="admin-table-meta">
                                                {member.socialLinks?.linkedin && <LuLinkedin size={12} style={{ marginRight: 4 }} />}
                                                {member.socialLinks?.twitter && <LuTwitter size={12} style={{ marginRight: 4 }} />}
                                                {member.socialLinks?.instagram && <LuInstagram size={12} />}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{member.role}</td>
                                <td>{member.order}</td>
                                <td>
                                    <span className={`admin-badge ${member.isPublished ? 'published' : 'draft'}`}>
                                        {member.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button className="admin-action-btn" onClick={() => handleOpenModal(member)} title="Edit">
                                            <LuPencil size={16} />
                                        </button>
                                        <button className="admin-action-btn admin-action-btn-danger" onClick={() => handleDelete(member._id)} title="Delete">
                                            <LuTrash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{editingMember ? "Edit Team Member" : "Add Team Member"}</h3>
                            <button onClick={() => setIsModalOpen(false)}><LuX size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-upload">
                                <label className="admin-upload-label">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="admin-upload-preview" />
                                    ) : (
                                        <div className="admin-upload-placeholder">
                                            <LuUpload size={24} />
                                            <span>Upload Photo</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setImageFile(file);
                                                setPreviewUrl(URL.createObjectURL(file));
                                            }
                                        }}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className="admin-form-grid">
                                <div className="admin-form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="admin-form-grid">
                                <div className="admin-form-group">
                                    <label>LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Twitter URL</label>
                                    <input
                                        type="url"
                                        value={formData.twitter}
                                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Instagram URL</label>
                                    <input
                                        type="url"
                                        value={formData.instagram}
                                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="admin-form-grid">
                                <div className="admin-form-group">
                                    <label>Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label>Status</label>
                                    <div className="admin-switch">
                                        <input
                                            type="checkbox"
                                            checked={formData.isPublished}
                                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                            id="isPublished"
                                        />
                                        <label htmlFor="isPublished">
                                            {formData.isPublished ? (
                                                <><LuCheck size={14} /> Published</>
                                            ) : (
                                                <><LuX size={14} /> Draft</>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-modal-actions">
                                <button type="button" className="admin-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                                    {loading ? "Saving..." : (editingMember ? "Update Member" : "Add Member")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
