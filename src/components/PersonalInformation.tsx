import { FaEnvelopeOpenText, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export function PersonalInformation() {
    return (
        <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">

            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                <a href="mailto:renjith.wky@gmail.com" aria-label="Send email to renjith.wky@gmail.com" className="cursor-pointer">
                    <span aria-hidden="true" className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#6AB5B9] shadow-md">
                        <FaEnvelopeOpenText />
                    </span>
                </a>
                <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Email</p>
                    <p className="dark:text-white break-all">
                        <a
                            className="hover:text-accent-color duration-300 transition text-[14px] lg:text-[16px]"
                            href="mailto:renjith.wky@gmail.com"
                        >
                            renjith.wky@gmail.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                <a href="tel:+13322012312" aria-label="Call +1 332-201-2312" className="cursor-pointer">
                    <span aria-hidden="true" className="flex-shrink-0 socialbtn bg-white dark:bg-black text-accent-color shadow-md">
                        <FaPhone />
                    </span>
                </a>
                <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Phone</p>
                    <p className="dark:text-white break-all">
                        <a
                            className="hover:text-accent-color duration-300 transition text-[14px] lg:text-[16px]"
                            href="tel:+13322012312"
                        >
                            +1 332-201-2312
                        </a>
                    </p>
                </div>
            </div>

            <div className="flex py-2.5">
                <span aria-hidden="true" className="flex-shrink-0 socialbtn bg-white dark:bg-black text-accent-color shadow-md">
                    <FaMapMarkerAlt />
                </span>
                <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Location</p>
                    <p className="dark:text-white break-all text-[14px] lg:text-[16px]">Fremont, CA</p>
                </div>
            </div>
        </div>
    )
}
