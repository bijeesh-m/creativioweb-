import type { Metadata } from "next";
import WorkContent from "@/components/work/WorkContent";

export const metadata: Metadata = {
    title: "Our Work & Portfolio — Digital Marketing Projects by Creativio",
    description:
        "Explore Creativio's curated portfolio of digital marketing, branding, web development, and creative projects. See how we help businesses in Calicut, Malappuram, and across Kerala achieve measurable growth.",
    openGraph: {
        title: "Our Work & Portfolio — Creativio",
        description:
            "Explore our curated portfolio of digital marketing and branding projects across Kerala.",
        url: "https://creativio.in/work",
    },
    alternates: {
        canonical: "https://creativio.in/work",
    },
};

export default function WorkPage() {
    return <WorkContent />;
}
