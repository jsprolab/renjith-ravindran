import { BiMenuAltRight } from "react-icons/bi"
import { RiCloseFill } from "react-icons/ri"

interface MenuButtonProps {
    menuOpen: boolean,
    setMenuOpen: (state: boolean) => void
}

export const MenuButton = ({ menuOpen, setMenuOpen }: MenuButtonProps) => {
    return (
        <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden hover:text-accent-color dark:hover:text-accent-color bg-primary-bg-light w-[40px] h-[40px] rounded-full flex justify-center items-center text-gray-lite dark:text-white dark:bg-primary-bg-dark text-3xl ml-3 cursor-pointer transition-all duration-300 ease-in-out"
        >
            {menuOpen
                ? <RiCloseFill aria-hidden="true" className="rounded-full" />
                : <BiMenuAltRight aria-hidden="true" className="rounded-full" />
            }
        </button>
    )
}
