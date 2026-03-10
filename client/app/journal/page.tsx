import type { Metadata } from "next";
import JournalContent from "@/components/journal/JournalContent";

export const metadata: Metadata = {
    title: "Digital Marketing Insights & Blog — Creativio Journal",
    description:
        "Read the latest digital marketing insights, branding strategies, and industry trends from Creativio. Expert perspectives on SEO, social media, and creative strategies for businesses in Kerala.",
    openGraph: {
        title: "Digital Marketing Insights & Blog — Creativio Journal",
        description:
            "Expert perspectives on digital marketing, branding, and creative strategies from Creativio.",
        url: "https://creativio.in/journal",
    },
    alternates: {
        canonical: "https://creativio.in/journal",
    },
};

export default function JournalPage() {
    return <JournalContent />;
}
