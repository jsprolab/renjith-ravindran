export type Publication = {
    id: number
    title: string
    authors: string
    venue: string
    year: number
    citations?: number
    link?: string
    type: 'journal' | 'conference' | 'article'
}

export const publicationsData = (): Publication[] => [
    // Journal Articles
    {
        id: 1,
        title: "Enhancing Smart Contract Security with Explainable AI: A Framework for Re-entrancy Vulnerability Detection and Explanation",
        authors: "MH Maturi, E De La Cruz, SR Addula, AR Yadulla, RK Ravindran, et al.",
        venue: "2025 Systems and Information Engineering Design Symposium (SIEDS)",
        year: 2025,
        citations: 8,
        type: 'conference'
    },
    {
        id: 2,
        title: "Leveraging AI for Continuous Quality Assurance in Agile Software Development Cycles",
        authors: "S Polampally, K Kudithipudi, VK Jyothi, A Morsu, SK Ragunayakula, RK Ravindran, et al.",
        venue: "Cloud Computing and Data Science",
        year: 2026,
        citations: 1,
        type: 'journal'
    },
    {
        id: 3,
        title: "Decoding Cybersecurity Discourse and Communication Dynamics in Financial Institutions",
        authors: "J Davis, S Maddini, S Kankala, RK Ravindran, M Kunkulagunta, et al.",
        venue: "Journal of Responsible Technology",
        year: 2025,
        citations: 1,
        type: 'journal'
    },
    {
        id: 4,
        title: "Utilizing Explainable AI in Financial Risk Assessment: Enhancing User Empowerment through Interpretable Credit Scoring Models",
        authors: "H Gonaygunta, MH Maturi, AR Yadulla, RK Ravindran, E De La Cruz, et al.",
        venue: "2025 Systems and Information Engineering Design Symposium (SIEDS)",
        year: 2025,
        citations: 1,
        type: 'conference'
    },
    {
        id: 5,
        title: "Data-Driven Predictive Models for Gig Economy Workforce Optimization",
        authors: "GS Nadella, MH Maturi, RK Ravindran, E De La Cruz, H Gonaygunta, et al.",
        venue: "International IoT, Electronics and Mechatronics Conference (IEMTRONICS)",
        year: 2025,
        citations: 1,
        type: 'conference'
    },
    {
        id: 6,
        title: "Exploring the Perceptions and Experiences of Educators Using E-Learning Platforms: A Thematic Approach",
        authors: "K Meduri, GS Nadella, E De La Cruz, RK Ravindran, H Gonaygunta, et al.",
        venue: "2025 IEEE Integrated STEM Education Conference (ISEC)",
        year: 2025,
        citations: 1,
        type: 'conference'
    },
    {
        id: 7,
        title: "Human-Centered AI Virtual Assistants: Enhancing Engagement, Trust, and Task Automation Through NLP and Emotional Cues",
        authors: "SC Janagama, EA De La Cruz, RK Ravindran, M Mcclain, R Finnegan, et al.",
        venue: "2026 International Conference on Cognitive Systems and Computer Interaction (ICoSCI)",
        year: 2026,
        type: 'conference'
    },
    {
        id: 8,
        title: "Evaluating the Effectiveness of Risk-Based Monitoring and Artificial Intelligence-Driven Strategies in Clinical Trial Management: A Data-Driven Analysis",
        authors: "RK Ravindran, S Ragunayakula, SK Polampally, SAB Vijayan, A Morsu, et al.",
        venue: "International Journal of Advanced Engineering Research and Science, 13(2), 48–55",
        year: 2026,
        type: 'journal'
    },
    {
        id: 9,
        title: "Cultivating Agile Software Development Teams through IT Servant Leadership: Strategies for Success",
        authors: "D Guru, VK Jyothi, A Morsu, K Kudithipudi, RK Ravindran, S Polampally, et al.",
        venue: "2025 International Conference on Electrical Engineering, Computer Science and Informatics (ICEECSI)",
        year: 2025,
        type: 'conference'
    },
    {
        id: 10,
        title: "A Grounded Theory Approach to Blockchain Smart Contracts in Cybersecurity and IT Adoption",
        authors: "K Meduri, E De La Cruz, RK Ravindran, V Ragunath, et al.",
        venue: "International Cybersecurity Law Review, 6(3), 335–366",
        year: 2025,
        type: 'journal'
    },
    {
        id: 11,
        title: "Enhancing Agile Software Development through Advanced Human-Computer Interaction Design",
        authors: "D Guru, J Davis, M Kunkulagunta, GS Nadella, S Kankala, V Raghunath, RK Ravindran, et al.",
        venue: "Journal of University of Bahrain",
        year: 2025,
        type: 'journal'
    },
    {
        id: 12,
        title: "Autonomous Supply Chain Optimization Using Machine Learning",
        authors: "MH Maturi, RK Ravindran, V Raghunath, K Meduri, H Gonaygunta, et al.",
        venue: "International IoT, Electronics and Mechatronics Conference (IEMTRONICS)",
        year: 2025,
        type: 'conference'
    },
    {
        id: 13,
        title: "Blockchain-Enabled Digital Therapeutics for Managing Public Health Emergencies",
        authors: "H Gonaygunta, RK Ravindran, MK Meesala, V Raghunath, MH Maturi, et al.",
        venue: "International IoT, Electronics and Mechatronics Conference (IEMTRONICS)",
        year: 2025,
        type: 'conference'
    },
    {
        id: 14,
        title: "The Impact of Generative AI on Clinical Decision-Support Systems: A Systematic Review of Applications, Benefits, and Ethical Challenges",
        authors: "SK Polampally, RK Ravindran, J Jeyabalan, VR Kusam, A Morsu, et al.",
        venue: "Proceedings of Universitas Muhammadiyah Yogyakarta Graduate Conference, 5(1)",
        year: 2025,
        type: 'conference'
    },
    // DZone Technical Articles
    {
        id: 15,
        title: "Integrating OpenID Connect (OIDC) Authentication in Angular and React",
        authors: "Renjith Kathalikkattil Ravindran",
        venue: "DZone · 1,445 views",
        year: 2026,
        link: "https://dzone.com",
        type: 'article'
    },
    {
        id: 16,
        title: "Micro Frontends in Angular and React: A Deep Technical Guide for Scalable Front-End Architecture",
        authors: "Renjith Kathalikkattil Ravindran",
        venue: "DZone · 2,594 views",
        year: 2026,
        link: "https://dzone.com",
        type: 'article'
    },
    {
        id: 17,
        title: "Mastering Accessibility in Web Development: A Developer's Guide",
        authors: "Renjith Kathalikkattil Ravindran",
        venue: "DZone · 1,251 views",
        year: 2025,
        link: "https://dzone.com",
        type: 'article'
    },
]
