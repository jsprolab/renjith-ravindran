import { Helmet } from "react-helmet-async";

const SITE_URL = "https://renjith.online";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = "Renjith Kathalikkattil Ravindran";

export type PageTitleProps = {
    title: string
    description?: string
    path?: string
    image?: string
}

export const PageTitle = ({
    title,
    description = "Renjith Kathalikkattil Ravindran (Renjith K Ravindran) — Senior Software Engineer III and Principal UI Architect with 18+ years of experience in React, Next.js, Angular, and TypeScript. IEEE Senior Member. Fremont, CA.",
    path = "/",
    image = DEFAULT_IMAGE,
}: PageTitleProps) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonical = `${SITE_URL}${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={SITE_NAME} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content="profile" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}
