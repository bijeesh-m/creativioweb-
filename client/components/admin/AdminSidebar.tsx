"use client";
import {
    LuLayoutDashboard,
    LuBriefcase,
    LuUsers,
    LuMessageSquare,
    LuServer,
    LuTag,
    LuSettings,
    LuLogOut
} from "react-icons/lu";

type AdminView = "dashboard" | "works" | "clients" | "testimonials" | "services" | "categories" | "settings";

interface Props {
    currentView: AdminView;
    onNavigate: (view: AdminView) => void;
    admin: any;
    onLogout: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

const navItems: { key: AdminView; label: string; icon: any }[] = [
    { key: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    { key: "works", label: "Works", icon: LuBriefcase },
    { key: "clients", label: "Clients", icon: LuUsers },
    { key: "testimonials", label: "Testimonials", icon: LuMessageSquare },
    { key: "services", label: "Services", icon: LuServer },
    { key: "categories", label: "Categories", icon: LuTag },
    { key: "settings", label: "Settings", icon: LuSettings },
];

export default function AdminSidebar({ currentView, onNavigate, admin, onLogout, isOpen }: Props) {
    return (
        <aside className={`admin-sidebar ${isOpen ? "open" : "collapsed"}`}>
            <div className="admin-sidebar-brand">
                <div className="admin-sidebar-logo">C</div>
                {isOpen && <span className="admin-sidebar-brand-text">Creativio</span>}
            </div>
            <nav className="admin-sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button key={item.key} className={`admin-nav-item ${currentView === item.key ? "active" : ""}`} onClick={() => onNavigate(item.key)} title={item.label}>
                            <Icon size={20} />
                            {isOpen && <span>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
            <div className="admin-sidebar-footer">
                <div className="admin-sidebar-user">
                    <div className="admin-user-avatar">{admin?.name?.[0] || "A"}</div>
                    {isOpen && (
                        <div className="admin-user-info">
                            <span className="admin-user-name">{admin?.name}</span>
                            <span className="admin-user-role">{admin?.role}</span>
                        </div>
                    )}
                </div>
                <button className="admin-logout-btn" onClick={onLogout} title="Logout">
                    <LuLogOut size={20} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
