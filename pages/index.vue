<template>
  <div>
    <LandingHero />
    <LandingAbout />
    <LandingTools />
    <LandingFezrs />
    <LandingShowcase />
    <LandingResearch />
    <LandingDocumentation />
    <LandingRequestDemo />
    <LandingTeam />
    <LandingContact />
    <LandingCollaborations />
  </div>
</template>

<script lang="ts" setup>
import { organization, website } from "~/data/schema";

const { siteUrl } = useRuntimeConfig().public;

usePageSeo({
  path: "/",
  title: "FEZtool: Free & Easy tools for Earth sciences",
  description:
    "FEZtool builds free, open-source Python tools for remote sensing, climate and geohazards. FEZrs, our multispectral image-processing library, is available on PyPI and conda.",
});
useJsonLd([organization(siteUrl), website(siteUrl)]);
</script>
