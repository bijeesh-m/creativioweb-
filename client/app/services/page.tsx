import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesCTA from "@/components/services/ServicesCTA";

export const metadata: Metadata = {
    title: "Digital Marketing & Branding Services in Calicut, Malappuram — Creativio",
    description:
        "Explore Creativio's full range of digital marketing services in Calicut and Malappuram — SEO, social media marketing, branding, web development, video production, and CGI. Tailored strategies to grow your business in Kerala and beyond.",
    openGraph: {
        title: "Digital Marketing & Branding Services — Creativio",
        description:
            "SEO, social media marketing, branding, web development, video production, and CGI services in Calicut and Malappuram, Kerala.",
        url: "https://creativio.in/services",
    },
    alternates: {
        canonical: "https://creativio.in/services",
    },
};

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <ServicesList />
            <ServicesCTA />
        </>
    );
}
