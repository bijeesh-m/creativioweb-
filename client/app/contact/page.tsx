import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
    title: "Contact Creativio — Digital Marketing Agency in Calicut & Malappuram",
    description:
        "Get in touch with Creativio, the best digital marketing agency in Calicut and Malappuram, Kerala. Let's discuss your project — digital marketing, branding, web development, or creative strategy.",
    openGraph: {
        title: "Contact Creativio — Digital Marketing Agency in Calicut & Malappuram",
        description:
            "Start a conversation with Creativio about your next digital marketing or branding project.",
        url: "https://creativio.in/contact",
    },
    alternates: {
        canonical: "https://creativio.in/contact",
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
