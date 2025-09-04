import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";


export function SocialLinks() {

    return (
        <div className="flex flex-row socialSm:flex-col justify-center space-x-3 socialSm:space-x-0 socialSm:space-y-3">
            <a
              href="https://www.linkedin.com/in/renjith-kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn">
                <FaLinkedinIn />
              </span>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/jsprolab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn">
                <FaGithub />
              </span>
            </a>
          </div>
    )
}