import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import ServicePackages from "@/components/services/ServicePackages";
import ServiceProjects from "@/components/services/ServiceProjects";
import ServicesCTA from "@/components/services/ServicesCTA";

import { api } from "@/lib/api";

export async function generateStaticParams() {
    const response = await api.getPublicServices();
    if (!response.success) return [];

    return response.data.map((service: any) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    try {
        const response = await api.getPublicServiceBySlug(slug);
        if (!response.success) throw new Error();
        const service = response.data;

        return {
            title: `${service.title} Services in Calicut & Malappuram — Creativio`,
            description: `${service.shortDescription} Creativio offers professional ${service.title.toLowerCase()} services in Calicut, Malappuram, and across Kerala.`,
            openGraph: {
                title: `${service.title} Services — Creativio`,
                description: `Professional ${service.title.toLowerCase()} services by Creativio in Calicut and Malappuram, Kerala.`,
                url: `https://creativio.in/services/${service.slug}`,
            },
            alternates: {
                canonical: `https://creativio.in/services/${service.slug}`,
            },
        };
    } catch {
        return {
            title: "Service Not Found",
        };
    }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    let service;
    try {
        const response = await api.getPublicServiceBySlug(slug);
        if (!response.success) throw new Error();
        service = response.data;
    } catch {
        notFound();
    }

    return (
        <>
            <ServiceDetailHero title={service.title} description={service.shortDescription} />
            <ServiceDetailContent service={service} />
            {service.packages && <ServicePackages packages={service.packages} />}
            <ServiceProjects serviceTitle={service.title} serviceId={service._id} />
            <ServicesCTA />
        </>
    );
}
