"use client";

import { useState, useEffect } from "react";
import { api, AuthError } from "@/lib/api";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import WorksManager from "@/components/admin/WorksManager";
import ClientsManager from "@/components/admin/ClientsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import ServicesManager from "@/components/admin/ServicesManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import SettingsManager from "@/components/admin/SettingsManager";
import "@/styles/admin.css";

type AdminView = "dashboard" | "works" | "clients" | "testimonials" | "services" | "categories" | "settings";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState<any>(null);
    const [currentView, setCurrentView] = useState<AdminView>("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        checkAuth();
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const checkAuth = async () => {
        try {
            const token = api.getAccessToken();
            if (!token) { setIsLoading(false); return; }
            const res = await api.getMe();
            setAdmin(res.data);
            setIsAuthenticated(true);
        } catch {
            api.setAccessToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        const res = await api.login(email, password);
        setAdmin(res.data.admin);
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await api.logout();
        setIsAuthenticated(false);
        setAdmin(null);
        setCurrentView("dashboard");
    };

    const handleNavigate = (view: AdminView) => {
        setCurrentView(view);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    if (isLoading) {
        return (
            <div className="admin-loader">
                <div className="admin-loader-spinner" />
                <p>Loading Creativio Admin...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    const renderView = () => {
        switch (currentView) {
            case "dashboard": return <AdminDashboard />;
            case "works": return <WorksManager />;
            case "clients": return <ClientsManager />;
            case "testimonials": return <TestimonialsManager />;
            case "services": return <ServicesManager />;
            case "categories": return <CategoriesManager />;
            case "settings": return <SettingsManager />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile overlay backdrop */}
            {isMobile && sidebarOpen && (
                <div
                    className={`admin-sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <AdminSidebar
                currentView={currentView}
                onNavigate={handleNavigate}
                admin={admin}
                onLogout={handleLogout}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
            <main className={`admin-main ${sidebarOpen && !isMobile ? "" : "sidebar-collapsed"}`}>
                <header className="admin-header">
                    <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                    </button>
                    <h1 className="admin-page-title">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
                    <div className="admin-header-right">
                        <span className="admin-welcome">Welcome, {admin?.name}</span>
                    </div>
                </header>
                <div className="admin-content">{renderView()}</div>
            </main>
        </div>
    );
}
