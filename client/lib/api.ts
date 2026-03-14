const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
    private accessToken: string | null = null;
    private refreshing: Promise<string | null> | null = null;

    setAccessToken(token: string | null) {
        this.accessToken = token;
        if (token) {
            localStorage.setItem('creativio_admin_token', token);
        } else {
            localStorage.removeItem('creativio_admin_token');
        }
    }

    getAccessToken(): string | null {
        if (this.accessToken) return this.accessToken;
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('creativio_admin_token');
        }
        return this.accessToken;
    }

    private async refreshAccessToken(): Promise<string | null> {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Refresh failed');
            const data = await res.json();
            this.setAccessToken(data.data.accessToken);
            return data.data.accessToken;
        } catch {
            this.setAccessToken(null);
            return null;
        }
    }

    private getAuthHeaders(): Record<string, string> {
        const token = this.getAccessToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE}${endpoint}`;
        const headers: Record<string, string> = {
            ...this.getAuthHeaders(),
            ...(options.headers as Record<string, string>),
        };

        // Don't set Content-Type for FormData
        if (!(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        let res = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        // Handle token expiry
        if (res.status === 401) {
            const data = await res.json();
            if (data.code === 'TOKEN_EXPIRED') {
                // Prevent concurrent refreshes
                if (!this.refreshing) {
                    this.refreshing = this.refreshAccessToken();
                }
                const newToken = await this.refreshing;
                this.refreshing = null;

                if (newToken) {
                    headers.Authorization = `Bearer ${newToken}`;
                    res = await fetch(url, { ...options, headers, credentials: 'include' });
                } else {
                    throw new AuthError('Session expired. Please login again.');
                }
            } else {
                throw new AuthError(data.message || 'Not authorized');
            }
        }

        const responseData = await res.json();

        if (!res.ok) {
            throw new ApiError(responseData.message || 'Request failed', res.status);
        }

        return responseData;
    }

    // Auth
    async login(email: string, password: string) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.setAccessToken(data.data.accessToken);
        return data;
    }

    async logout() {
        try {
            await this.request('/auth/logout', { method: 'POST' });
        } finally {
            this.setAccessToken(null);
        }
    }

    async getMe() {
        return this.request('/auth/me');
    }

    async changePassword(currentPassword: string, newPassword: string) {
        const data = await this.request('/auth/change-password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        if (data.data?.accessToken) {
            this.setAccessToken(data.data.accessToken);
        }
        return data;
    }

    // Dashboard
    async getDashboard() {
        return this.request('/admin/dashboard');
    }

    // Public Services
    async getPublicServices() {
        return this.request('/services');
    }

    async getPublicServiceBySlug(slug: string) {
        return this.request(`/services/${slug}`);
    }

    // Public Works
    async getPublicWorks(params?: Record<string, string>) {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request(`/works${query}`);
    }

    async getPublicWorkBySlug(slug: string) {
        return this.request(`/works/${slug}`);
    }

    // Public Clients
    async getPublicClients() {
        return this.request('/clients');
    }

    // Works
    async getWorks(params?: Record<string, string>) {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request(`/works/admin/all${query}`);
    }

    async createWork(formData: FormData) {
        return this.request('/works/admin', {
            method: 'POST',
            body: formData,
        });
    }

    async updateWork(id: string, formData: FormData) {
        return this.request(`/works/admin/${id}`, {
            method: 'PUT',
            body: formData,
        });
    }

    async deleteWork(id: string) {
        return this.request(`/works/admin/${id}`, { method: 'DELETE' });
    }

    // Clients
    async getClients() {
        return this.request('/clients/admin/all');
    }

    async createClient(formData: FormData) {
        return this.request('/clients/admin', {
            method: 'POST',
            body: formData,
        });
    }

    async updateClient(id: string, formData: FormData) {
        return this.request(`/clients/admin/${id}`, {
            method: 'PUT',
            body: formData,
        });
    }

    async deleteClient(id: string) {
        return this.request(`/clients/admin/${id}`, { method: 'DELETE' });
    }

    // Testimonials
    async getTestimonials() {
        return this.request('/testimonials/admin/all');
    }

    async createTestimonial(formData: FormData) {
        return this.request('/testimonials/admin', {
            method: 'POST',
            body: formData,
        });
    }

    async updateTestimonial(id: string, formData: FormData) {
        return this.request(`/testimonials/admin/${id}`, {
            method: 'PUT',
            body: formData,
        });
    }

    async deleteTestimonial(id: string) {
        return this.request(`/testimonials/admin/${id}`, { method: 'DELETE' });
    }

    // Services
    async getServices() {
        return this.request('/services/admin/all');
    }

    async createService(formData: FormData) {
        return this.request('/services/admin', {
            method: 'POST',
            body: formData,
        });
    }

    async updateService(id: string, formData: FormData) {
        return this.request(`/services/admin/${id}`, {
            method: 'PUT',
            body: formData,
        });
    }

    async deleteService(id: string) {
        return this.request(`/services/admin/${id}`, { method: 'DELETE' });
    }

    // Team
    async getPublicTeam() {
        return this.request('/team');
    }

    async getTeamMembers() {
        return this.request('/team/admin/all');
    }

    async createTeamMember(formData: FormData) {
        return this.request('/team/admin', {
            method: 'POST',
            body: formData,
        });
    }

    async updateTeamMember(id: string, formData: FormData) {
        return this.request(`/team/admin/${id}`, {
            method: 'PUT',
            body: formData,
        });
    }

    async deleteTeamMember(id: string) {
        return this.request(`/team/admin/${id}`, { method: 'DELETE' });
    }

    // Categories
    async getCategories() {
        return this.request('/categories/admin/all');
    }

    async createCategory(data: Record<string, any>) {
        return this.request('/categories/admin', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCategory(id: string, data: Record<string, any>) {
        return this.request(`/categories/admin/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteCategory(id: string) {
        return this.request(`/categories/admin/${id}`, { method: 'DELETE' });
    }

    // Settings
    async getSettings() {
        return this.request('/settings/admin/all');
    }

    async upsertSetting(data: Record<string, any>) {
        return this.request('/settings/admin', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async batchUpsertSettings(settings: Record<string, any>[]) {
        return this.request('/settings/admin/batch', {
            method: 'PUT',
            body: JSON.stringify({ settings }),
        });
    }

    // Upload
    async uploadFile(file: File, folder?: string) {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);
        return this.request('/upload', {
            method: 'POST',
            body: formData,
        });
    }
}

class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class AuthError extends ApiError {
    constructor(message: string) {
        super(message, 401);
    }
}

export const api = new ApiClient();
export { ApiError, AuthError };
