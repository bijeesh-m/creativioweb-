"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { LuImage, LuCircleCheck, LuUsers, LuMessageSquare, LuServer, LuStar } from "react-icons/lu";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadStats(); }, []);

    const loadStats = async () => {
        try {
            const res = await api.getDashboard();
            setStats(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    if (loading) return <div className="admin-loading">Loading dashboard...</div>;

    const statCards = [
        { label: "Total Works", value: stats?.stats?.totalWorks || 0, color: "#7c3aed", icon: LuImage },
        { label: "Published", value: stats?.stats?.publishedWorks || 0, color: "#059669", icon: LuCircleCheck },
        { label: "Clients", value: stats?.stats?.totalClients || 0, color: "#2563eb", icon: LuUsers },
        { label: "Testimonials", value: stats?.stats?.totalTestimonials || 0, color: "#d97706", icon: LuMessageSquare },
        { label: "Services", value: stats?.stats?.totalServices || 0, color: "#dc2626", icon: LuServer },
        { label: "Featured", value: stats?.stats?.featuredWorks || 0, color: "#7c3aed", icon: LuStar },
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-stats-grid">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="admin-stat-card" style={{ "--accent": card.color } as any}>
                            <div className="admin-stat-icon">
                                <Icon size={24} color={card.color} />
                            </div>
                            <div className="admin-stat-info">
                                <span className="admin-stat-value">{card.value}</span>
                                <span className="admin-stat-label">{card.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="admin-dashboard-grid">
                <div className="admin-card">
                    <h3 className="admin-card-title">Recent Works</h3>
                    <div className="admin-recent-list">
                        {stats?.recentWorks?.length ? stats.recentWorks.map((w: any) => (
                            <div key={w._id} className="admin-recent-item">
                                {w.image?.url && (
                                    w.image?.mediaType === 'video' ? (
                                        <video
                                            src={w.image.url}
                                            className="admin-recent-thumb"
                                            muted
                                            onMouseOver={(e) => e.currentTarget.play()}
                                            onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                        />
                                    ) : (
                                        <img src={w.image.url} alt={w.title} className="admin-recent-thumb" />
                                    )
                                )}
                                <div><strong>{w.title}</strong><br /><small>{new Date(w.createdAt).toLocaleDateString()}</small></div>
                            </div>
                        )) : <p className="admin-empty-text">No works yet</p>}
                    </div>
                </div>
                <div className="admin-card">
                    <h3 className="admin-card-title">Recent Testimonials</h3>
                    <div className="admin-recent-list">
                        {stats?.recentTestimonials?.length ? stats.recentTestimonials.map((t: any) => (
                            <div key={t._id} className="admin-recent-item">
                                <div className="admin-recent-avatar">{t.clientName?.[0]}</div>
                                <div><strong>{t.clientName}</strong><br /><small>{t.company} · {"★".repeat(t.rating || 5)}</small></div>
                            </div>
                        )) : <p className="admin-empty-text">No testimonials yet</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
