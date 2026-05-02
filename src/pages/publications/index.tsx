import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer, PageTitle, DesktopNav, MobileNav, MenuButton, ThemeToggleButton, SocialLinks } from '../../components'
import { HomeCard } from '../home/HomeCard'
import { useData } from '../../hooks'
import { publicationsData, Publication } from '../../hooks/publicationsData'
import logo from '../../assets/logo/renjith.png'
import { AiOutlineLink } from 'react-icons/ai'
import { MdOutlineMenuBook } from 'react-icons/md'
import { BsJournalBookmark, BsPeopleFill } from 'react-icons/bs'

const typeConfig = {
    all:       { label: 'All',               color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200' },
    journal:   { label: 'Journal Articles',  color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    conference:{ label: 'Conference Papers', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    article:   { label: 'Technical Articles',color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
}

const TypeBadge = ({ type }: { type: Publication['type'] }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig[type].color}`}>
        {typeConfig[type].label}
    </span>
)

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="bg-[#F3F6F6] dark:bg-[#1D1D1D] rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-accent-color">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
)

export const Publications = () => {
    const { avatars, handleImageChange, setPrivacyPolicyIsOpen } = useData()
    const [menuOpen, setMenuOpen] = useState(false)
    const [filter, setFilter] = useState<'all' | Publication['type']>('all')
    const allPubs = publicationsData()

    useEffect(() => { handleImageChange(false, avatars.idea) }, [])
    useEffect(() => { if (menuOpen) setPrivacyPolicyIsOpen(false) }, [menuOpen])

    const filtered = filter === 'all' ? allPubs : allPubs.filter(p => p.type === filter)
    const totalCitations = allPubs.reduce((sum, p) => sum + (p.citations || 0), 0)
    const counts = {
        all: allPubs.length,
        journal: allPubs.filter(p => p.type === 'journal').length,
        conference: allPubs.filter(p => p.type === 'conference').length,
        article: allPubs.filter(p => p.type === 'article').length,
    }

    return (
        <main className="relative">
            <PageTitle title="Publications" />

            <section className="z-[100] bg-white dark:bg-black min-h-screen bg-no-repeat bg-center bg-cover bg-fixed w-full">
                <div className="container z-[1000] w-full bg-primary-bg-light dark:bg-primary-bg-dark lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0 lg:pt-[35px]">
                    <div className="w-full z-[1000] flex justify-between items-center px-4">
                        <Link to="/">
                            <img className="h-[26px] lg:h-[32px] rounded-md hover:scale-[105%] transition-all duration-50 ease-in-out" src={logo} alt="logo" />
                        </Link>
                        <div className="flex items-center">
                            <ThemeToggleButton />
                            <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        </div>
                    </div>
                </div>

                <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

                <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[110px]">
                    <div className="col-span-12 lg:col-span-4 hidden lg:block h-auto sticky">
                        <HomeCard />
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <DesktopNav />

                        <section className="bg-white overflow-hidden lg:mb-20 lg:rounded-2xl dark:bg-[#111111]">
                            <div className="container sm:px-5 md:px-10 lg:px-14">
                                <div className="py-12 px-4 md:px-0">

                                    <h2 data-aos="fade-left" className="after-effect after:left-52">
                                        Publications
                                    </h2>

                                    {/* Stats */}
                                    <div className="grid grid-cols-4 gap-3 mt-8" data-aos="fade-up">
                                        <StatCard value="18+" label="Publications" />
                                        <StatCard value={`${totalCitations}`} label="Citations" />
                                        <StatCard value="1" label="h-index" />
                                        <StatCard value="53+" label="Peer Reviews" />
                                    </div>

                                    {/* Scholar link */}
                                    <div className="mt-4 flex items-center gap-2" data-aos="fade-up">
                                        <a
                                            href="https://scholar.google.com/citations?user=_FTuFE0AAAAJ&hl=en"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-accent-color hover:underline"
                                        >
                                            <AiOutlineLink className="h-4 w-4" />
                                            View full profile on Google Scholar
                                        </a>
                                        <span className="text-gray-300 dark:text-gray-600">·</span>
                                        <a
                                            href="https://ieeexplore.ieee.org/author/742613591848955"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-accent-color hover:underline"
                                        >
                                            <AiOutlineLink className="h-4 w-4" />
                                            IEEE Xplore
                                        </a>
                                    </div>

                                    {/* Filter Tabs */}
                                    <div className="flex flex-wrap gap-2 mt-8" data-aos="fade-up">
                                        {(['all', 'journal', 'conference', 'article'] as const).map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setFilter(t)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                                    filter === t
                                                        ? 'bg-accent-color text-white border-accent-color'
                                                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-accent-color hover:text-accent-color'
                                                }`}
                                            >
                                                {t === 'all' ? 'All' : typeConfig[t].label} ({counts[t]})
                                            </button>
                                        ))}
                                    </div>

                                    {/* Publications List */}
                                    <div className="mt-6 space-y-4">
                                        {filtered.map((pub, idx) => (
                                            <div
                                                key={pub.id}
                                                data-aos="fade-up"
                                                data-aos-delay={idx * 30}
                                                className="p-5 rounded-xl border-2 border-[#EEF5FA] dark:border-[#212425] hover:border-accent-color dark:hover:border-accent-color transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                                            <TypeBadge type={pub.type} />
                                                            <span className="text-xs text-gray-400">{pub.year}</span>
                                                            {pub.citations !== undefined && pub.citations > 0 && (
                                                                <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                                                                    <BsPeopleFill className="h-3 w-3" />
                                                                    {pub.citations} {pub.citations === 1 ? 'citation' : 'citations'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-sm font-semibold dark:text-white leading-snug mb-1">
                                                            {pub.link ? (
                                                                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent-color transition-colors">
                                                                    {pub.title}
                                                                </a>
                                                            ) : pub.title}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{pub.authors}</p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 italic flex items-center gap-1">
                                                            {pub.type === 'article'
                                                                ? <AiOutlineLink className="h-3 w-3 flex-shrink-0" />
                                                                : pub.type === 'journal'
                                                                ? <BsJournalBookmark className="h-3 w-3 flex-shrink-0" />
                                                                : <MdOutlineMenuBook className="h-3 w-3 flex-shrink-0" />
                                                            }
                                                            {pub.venue}
                                                        </p>
                                                    </div>
                                                    {pub.link && (
                                                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-gray-400 hover:text-accent-color transition-colors mt-1">
                                                            <AiOutlineLink className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            <div className="pb-20">
                                <Footer />
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <div data-aos="fade-up" className="socialSm:fixed hidden socialSm:flex flex-col items-center bg-transparent button-vertical-after after:h-40 after:translate-y-[7rem] bottom-0 left-0 w-[10%] h-[25%]">
                <SocialLinks />
            </div>
        </main>
    )
}
