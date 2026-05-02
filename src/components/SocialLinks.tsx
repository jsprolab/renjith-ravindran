import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiIeee, SiGooglescholar, SiOrcid } from "react-icons/si";

export function SocialLinks() {
    return (
        <div className="flex flex-row socialSm:flex-col justify-center space-x-3 socialSm:space-x-0 socialSm:space-y-3">
            <a href="https://www.linkedin.com/in/renjith-kr/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <span className="socialbtn">
                    <FaLinkedinIn />
                </span>
            </a>
            <a href="https://github.com/jsprolab" target="_blank" rel="noopener noreferrer" title="GitHub">
                <span className="socialbtn">
                    <FaGithub />
                </span>
            </a>
            <a href="https://scholar.google.com/citations?user=_FTuFE0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" title="Google Scholar">
                <span className="socialbtn">
                    <SiGooglescholar />
                </span>
            </a>
            <a href="https://ieeexplore.ieee.org/author/742613591848955" target="_blank" rel="noopener noreferrer" title="IEEE Xplore">
                <span className="socialbtn">
                    <SiIeee />
                </span>
            </a>
            <a href="https://orcid.org/0009-0005-5256-9965" target="_blank" rel="noopener noreferrer" title="ORCID">
                <span className="socialbtn">
                    <SiOrcid />
                </span>
            </a>
        </div>
    )
}
