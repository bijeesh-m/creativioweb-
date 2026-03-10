import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutTeam from "@/components/about/AboutTeam";
import AboutOrigin from "@/components/about/AboutOrigin";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
    title: "About Creativio — Best Digital Marketing Agency in Calicut & Malappuram",
    description:
        "Learn about Creativio, the best digital marketing agency in Calicut and Malappuram, Kerala. We craft result-driven digital marketing, branding, and creative strategies that help businesses stand out, scale up, and succeed.",
    openGraph: {
        title: "About Creativio — Best Digital Marketing Agency in Calicut & Malappuram",
        description:
            "Learn about Creativio — a strategy-driven digital marketing and branding agency in Calicut and Malappuram, Kerala.",
        url: "https://creativio.in/about",
    },
    alternates: {
        canonical: "https://creativio.in/about",
    },
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <AboutTeam />
            <AboutOrigin />
            <WhyChooseUs />
            <AboutCTA />
        </>
    );
}
