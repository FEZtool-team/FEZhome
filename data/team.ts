// Core FEZteam. Sources: FEZdocs team page, GitHub profiles, and the author
// list (ORCID, affiliation) of the FEZrs paper. Keep titles professional.
import aradImage from "~/assets/img/team/aradfarahani.webp";
import mahdiImage from "~/assets/img/team/mhdned.webp";
import mohammadImage from "~/assets/img/team/mkiani12.webp";
import parsaImage from "~/assets/img/team/elmielmo.webp";
import moradiImage from "~/assets/img/team/sudotome.webp";
import yazdanifarImage from "~/assets/img/team/yazdanifar.webp";

export type LinkKind =
  | "website" | "github" | "linkedin" | "orcid" | "scholar" | "researchgate"
  | "x" | "instagram" | "facebook" | "leetcode" | "codeforces" | "pypi" | "anaconda";

export interface MemberLink {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Member {
  slug: string;
  name: string;
  alias?: string;
  role: string;
  summary: string;
  bio: string[];
  affiliation: string;
  focus: string[];
  projects: string[];
  paperNote: string;
  image: string;
  links: MemberLink[];
}

export const team: Member[] = [
  {
    slug: "arad-farahani",
    name: "Mahdi Farmahini Farahani",
    alias: "Arad",
    role: "Founder, Research & Development",
    summary:
      "Geophysics PhD researcher at the Chinese University of Hong Kong. Leads the scientific direction of FEZtool and the design of the FEZrs methods.",
    bio: [
      "Arad founded FEZtool and leads its research and development. He sets the scientific direction of the ecosystem, proposes new methods and packages, and checks that each tool stands up to research use.",
      "He is a geophysics PhD researcher in the Department of Earth and Environmental Science at the Chinese University of Hong Kong. His published work applies FEZrs to principal component analysis of Landsat 9 imagery, to K-means clustering and spectral indices for land-use and land-cover mapping, and to land-cover classification in engineering geology.",
    ],
    affiliation: "Department of Earth and Environmental Science, The Chinese University of Hong Kong",
    focus: ["Research", "Method design", "Package roadmap"],
    projects: ["FEZrs"],
    paperNote: "First author of the FEZrs software paper.",
    image: aradImage,
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/aradfarahani" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/aradfarahani/" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0008-3800-8688" },
      { kind: "scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?user=kUQR1egAAAAJ&hl=en" },
      { kind: "researchgate", label: "ResearchGate", href: "https://www.researchgate.net/profile/Mahdi-Farmahini-Farahani" },
      { kind: "x", label: "X", href: "https://x.com/aradfarahani" },
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/arad.farahani" },
      { kind: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/aradfarahani/" },
      { kind: "website", label: "Google Developer profile", href: "https://g.dev/aradfarahani" },
    ],
  },
  {
    slug: "mahdi-nedaee",
    name: "Mahdi Nedaee",
    alias: "Mehtiuo",
    role: "Product, Design & Engineering",
    summary:
      "Shapes the product and its interfaces, and is the lead maintainer of the FEZrs codebase, from architecture to release.",
    bio: [
      "Mahdi works across product direction, interface design, software engineering and documentation. He maintains the FEZrs codebase, from its calculator architecture and tests to packaging and releases on PyPI and Anaconda.",
      "He also builds FEZdocs, the documentation hub for the ecosystem, and is a co-author of the FEZrs software paper.",
    ],
    affiliation: "Department of Software Engineering, Shamsipour Technical College, Tehran",
    focus: ["Product direction", "Design", "Software engineering", "Documentation"],
    projects: ["FEZrs", "FEZdocs"],
    paperNote: "Co-author of the FEZrs software paper.",
    image: mahdiImage,
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/mhdned" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mahdi-nedaee-232168242/" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0001-0357-6019" },
      { kind: "pypi", label: "PyPI", href: "https://pypi.org/user/mehtiuo/" },
      { kind: "anaconda", label: "Anaconda", href: "https://anaconda.org/mhdned" },
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/mehtiuo" },
      { kind: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/Mehtiuo/" },
      { kind: "website", label: "mhdned.github.io", href: "https://mhdned.github.io" },
    ],
  },
  {
    slug: "mohammad-kiani",
    name: "Mohammad Kiani",
    role: "Full-stack Engineering",
    summary:
      "Builds and maintains FEZtool's web applications and services, connecting the Python tooling to the people who use it.",
    bio: [
      "Mohammad leads full-stack engineering at FEZtool. He builds and maintains the web systems and services around the tools, and gives practical engineering support wherever a project needs it.",
      "He contributes to FEZrs and is a co-author of its software paper.",
    ],
    affiliation: "Faculty of Computer Science, Islamic Azad University, Central Tehran Branch",
    focus: ["Full-stack development", "Web systems", "Engineering support"],
    projects: ["FEZrs"],
    paperNote: "Co-author of the FEZrs software paper.",
    image: mohammadImage,
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/mkiani12" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mohmmdkiani/" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0001-3867-2107" },
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/mohmmdkiani" },
    ],
  },
  {
    slug: "parsa-elmi",
    name: "Parsa Elmi",
    role: "Business Development & Operations",
    summary: "Manages partnerships, operations and the team, and is the corresponding author of the FEZrs paper.",
    bio: [
      "Parsa leads business development and operations. He manages contracts, partnerships and the growth of the team, and coordinates FEZtool's articles and papers.",
      "He is the corresponding author of the FEZrs software paper.",
    ],
    affiliation: "Faculty of Management, Islamic Azad University, Central Tehran Branch",
    focus: ["Business development", "Operations", "Partnerships", "Publications"],
    projects: ["FEZrs"],
    paperNote: "Corresponding author of the FEZrs software paper.",
    image: parsaImage,
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/elmielmo" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/elmiparsa/" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0005-2751-4161" },
      { kind: "facebook", label: "Facebook", href: "https://www.facebook.com/parsa.elmi" },
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/elmiparsa" },
    ],
  },
  {
    slug: "parsa-moradi",
    name: "Parsa Moradi",
    role: "Backend Engineering & Security",
    summary:
      "Develops FEZtool's Python backend services and geospatial software, with a background in web and API security testing.",
    bio: [
      "Parsa works on the Python backend of FEZtool's production systems. He designs and implements geospatial software that includes machine learning components, and contributes to software architecture, technical design and documentation.",
      "Before joining FEZtool he worked as an application penetration tester, testing web applications and APIs against the OWASP Web Security Testing Guide. He is a co-author of the FEZrs software paper.",
    ],
    affiliation: "Department of Software Engineering, Shamsipour Technical College, Tehran",
    focus: ["Backend development", "Geospatial software", "Application security"],
    projects: ["FEZrs"],
    paperNote: "Co-author of the FEZrs software paper.",
    image: moradiImage,
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/sudotome" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0000-2008-123X" },
    ],
  },
  {
    slug: "mohammadhossein-yazdanifar",
    name: "Mohammadhossein Yazdanifar",
    role: "Technical Strategy Lead",
    summary: "Leads technical strategy at FEZtool and is a co-author of the FEZrs software paper.",
    bio: [
      "Mohammadhossein leads technical strategy at FEZtool, guiding the technical direction of the ecosystem.",
      "He is a co-author of the FEZrs software paper.",
    ],
    affiliation: "Department of Industrial Engineering, Sharif University of Technology, Tehran",
    focus: ["Technical strategy"],
    projects: ["FEZrs"],
    paperNote: "Co-author of the FEZrs software paper.",
    image: yazdanifarImage,
    links: [
      { kind: "website", label: "yazdanifar.com", href: "https://yazdanifar.com" },
      { kind: "github", label: "GitHub", href: "https://github.com/ujubuju" },
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/yazdanifar" },
      { kind: "orcid", label: "ORCID", href: "https://orcid.org/0009-0009-3929-103X" },
      { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/m.h.yazdanifar" },
      { kind: "codeforces", label: "Codeforces", href: "https://codeforces.com/profile/Mohammadrobot" },
    ],
  },
];
