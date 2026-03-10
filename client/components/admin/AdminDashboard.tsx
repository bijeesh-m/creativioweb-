"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

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
        { label: "Total Works", value: stats?.stats?.totalWorks || 0, color: "#7c3aed", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { label: "Published", value: stats?.stats?.publishedWorks || 0, color: "#059669", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { label: "Clients", value: stats?.stats?.totalClients || 0, color: "#2563eb", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
        { label: "Testimonials", value: stats?.stats?.totalTestimonials || 0, color: "#d97706", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
        { label: "Services", value: stats?.stats?.totalServices || 0, color: "#dc2626", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
        { label: "Featured", value: stats?.stats?.featuredWorks || 0, color: "#7c3aed", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-stats-grid">
                {statCards.map((card) => (
                    <div key={card.label} className="admin-stat-card" style={{ "--accent": card.color } as any}>
                        <div className="admin-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon} /></svg>
                        </div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{card.value}</span>
                            <span className="admin-stat-label">{card.label}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="admin-dashboard-grid">
                <div className="admin-card">
                    <h3 className="admin-card-title">Recent Works</h3>
                    <div className="admin-recent-list">
                        {stats?.recentWorks?.length ? stats.recentWorks.map((w: any) => (
                            <div key={w._id} className="admin-recent-item">
                                {w.image?.url && <img src={w.image.url} alt={w.title} className="admin-recent-thumb" />}
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
