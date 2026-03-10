import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel | Creativio",
    description: "Creativio Admin Panel - Manage your creative agency content",
    robots: { index: false, follow: false },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div id="admin-root">
            {children}
        </div>
    );
}
