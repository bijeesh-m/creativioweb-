import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import ServicePackages from "@/components/services/ServicePackages";
import ServiceProjects from "@/components/services/ServiceProjects";
import ServicesCTA from "@/components/services/ServicesCTA";

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const service = servicesData.find((s) => s.id === resolvedParams?.slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} Services in Calicut & Malappuram — Creativio`,
        description: `${service.shortDescription} Creativio offers professional ${service.title.toLowerCase()} services in Calicut, Malappuram, and across Kerala.`,
        openGraph: {
            title: `${service.title} Services — Creativio`,
            description: `Professional ${service.title.toLowerCase()} services by Creativio in Calicut and Malappuram, Kerala.`,
            url: `https://creativio.in/services/${service.id}`,
        },
        alternates: {
            canonical: `https://creativio.in/services/${service.id}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    const service = servicesData.find((s) => s.id === slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <ServiceDetailHero title={service.title} description={service.shortDescription} />
            <ServiceDetailContent service={service} />
            {service.packages && <ServicePackages packages={service.packages} />}
            <ServiceProjects serviceTitle={service.title} />
            <ServicesCTA />
        </>
    );
}
