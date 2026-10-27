// schema.org entities for JSON-LD (see composables/useJsonLd.ts). The @id
// values are stable identifiers that FEZfm and FEZdocs also reference, so
// keep them unchanged. Every fact here must match the fezrs-reference skill
// or the page that shows it; nothing is added for search engines only.
import type { Member } from "~/data/team";

export const ids = (site: string) => ({
  organization: `${site}/#organization`,
  website: `${site}/#website`,
  fezrs: `${site}/fezrs/#software`,
  fezfm: `${site}/fezfm/#software`,
});

export const socialProfiles = [
  "https://github.com/FEZtool-team",
  "https://www.linkedin.com/company/feztool",
  "https://www.instagram.com/fez.tool",
  "https://www.reddit.com/r/FEZtool/",
  "https://t.me/FEZtool",
];

const free = { "@type": "Offer", price: "0", priceCurrency: "USD" };

export const organization = (site: string) => ({
  "@type": "Organization",
  "@id": ids(site).organization,
  name: "FEZtool",
  alternateName: "FEZ (Free & Easy)",
  url: `${site}/`,
  logo: { "@type": "ImageObject", url: `${site}/icon-512.png`, width: 512, height: 512 },
  email: "info@feztool.com",
  description: "FEZtool builds free, open-source tools for Earth sciences: remote sensing, climate and geohazards.",
  sameAs: socialProfiles,
});

export const website = (site: string) => ({
  "@type": "WebSite",
  "@id": ids(site).website,
  name: "FEZtool",
  url: `${site}/`,
  inLanguage: "en",
  publisher: { "@id": ids(site).organization },
});

export const fezrsSoftware = (site: string) => ({
  "@type": "SoftwareApplication",
  "@id": ids(site).fezrs,
  name: "FEZrs",
  url: `${site}/fezrs/`,
  description: "An open-source Python package for geospatial multispectral image processing and remote sensing.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Remote sensing",
  softwareRequirements: "Python 3.11 or later",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  isAccessibleForFree: true,
  offers: free,
  downloadUrl: "https://pypi.org/project/fezrs/",
  installUrl: "https://pypi.org/project/fezrs/",
  softwareHelp: { "@type": "CreativeWork", url: "https://feztool-team.github.io/FEZdocs/libraries/fezrs/" },
  featureList: ["Change detection", "Filters", "Image enhancement", "Spectral indices", "Clustering and classification"],
  publisher: { "@id": ids(site).organization },
  sameAs: [
    "https://github.com/FEZtool-team/FEZrs",
    "https://pypi.org/project/fezrs/",
    "https://anaconda.org/FEZtool/fezrs",
    "https://doi.org/10.5281/zenodo.14938038",
  ],
});

export const fezfmApp = (site: string) => ({
  "@type": "WebApplication",
  "@id": ids(site).fezfm,
  name: "FEZfm",
  url: "https://fezfm.feztool.com/",
  description:
    "An earthquake monitor that merges USGS and EMSC reports every 30 minutes, tags fault zones in Iran and publishes a feed, a map and downloadable data.",
  applicationCategory: "ReferenceApplication",
  browserRequirements: "Requires JavaScript for the map",
  isAccessibleForFree: true,
  offers: free,
  publisher: { "@id": ids(site).organization },
  sameAs: ["https://github.com/FEZtool-team/FEZfm"],
});

export const breadcrumbs = (site: string, trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: step.name,
    item: `${site}${step.path}`,
  })),
});

export const person = (site: string, member: Member, image: string) => {
  const orcid = member.links.find((l) => l.kind === "orcid")?.href;
  return {
    "@type": "Person",
    "@id": `${site}/team/${member.slug}/#person`,
    name: member.name,
    ...(member.alias ? { alternateName: member.alias } : {}),
    jobTitle: member.role,
    description: member.summary,
    image,
    url: `${site}/team/${member.slug}/`,
    affiliation: { "@type": "Organization", name: member.affiliation },
    memberOf: { "@id": ids(site).organization },
    ...(orcid ? { identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: orcid.replace(/^.*orcid\.org\//, "") } } : {}),
    sameAs: member.links.map((l) => l.href),
  };
};
