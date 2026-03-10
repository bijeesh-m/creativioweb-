"use client";
import { useState } from "react";

interface Props { onLogin: (email: string, password: string) => Promise<void>; }

export default function AdminLogin({ onLogin }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await onLogin(email, password);
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-bg">
                <div className="admin-login-orb admin-login-orb-1" />
                <div className="admin-login-orb admin-login-orb-2" />
                <div className="admin-login-orb admin-login-orb-3" />
            </div>
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    <div className="admin-login-logo-icon">C</div>
                    <h1>Creativio</h1>
                    <p>Admin Panel</p>
                </div>
                <form onSubmit={handleSubmit} className="admin-login-form">
                    {error && <div className="admin-login-error">{error}</div>}
                    <div className="admin-input-group">
                        <label htmlFor="admin-email">Email</label>
                        <div className="admin-input-wrapper">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <input id="admin-email" type="email" placeholder="admin@creativio.in" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                        </div>
                    </div>
                    <div className="admin-input-group">
                        <label htmlFor="admin-password">Password</label>
                        <div className="admin-input-wrapper">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            <input id="admin-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
                            <button type="button" className="admin-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? <span className="admin-btn-spinner" /> : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
