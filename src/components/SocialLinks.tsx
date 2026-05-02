import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiIeee, SiGooglescholar, SiOrcid } from "react-icons/si";

const links = [
    { href: "https://www.linkedin.com/in/renjith-kr/",                          label: "LinkedIn profile",       Icon: FaLinkedinIn },
    { href: "https://github.com/jsprolab",                                       label: "GitHub profile",         Icon: FaGithub },
    { href: "https://scholar.google.com/citations?user=_FTuFE0AAAAJ&hl=en",     label: "Google Scholar profile", Icon: SiGooglescholar },
    { href: "https://ieeexplore.ieee.org/author/742613591848955",                label: "IEEE Xplore profile",    Icon: SiIeee },
    { href: "https://orcid.org/0009-0005-5256-9965",                             label: "ORCID profile",          Icon: SiOrcid },
]

export function SocialLinks() {
    return (
        <div className="flex flex-row socialSm:flex-col justify-center space-x-3 socialSm:space-x-0 socialSm:space-y-3">
            {links.map(({ href, label, Icon }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                >
                    <span className="socialbtn" aria-hidden="true">
                        <Icon />
                    </span>
                </a>
            ))}
        </div>
    )
}
