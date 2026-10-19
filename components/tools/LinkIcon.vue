<template>
  <component :is="icons[kind]" aria-hidden="true" />
</template>

<script setup lang="ts">
import type { LinkKind } from "~/data/team";
import WebsiteIcon from "~icons/material-symbols-light/language";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import OrcidIcon from "~icons/simple-icons/orcid";
import ScholarIcon from "~icons/simple-icons/googlescholar";
import ResearchGateIcon from "~icons/simple-icons/researchgate";
import XIcon from "~icons/simple-icons/x";
import InstagramIcon from "~icons/simple-icons/instagram";
import FacebookIcon from "~icons/simple-icons/facebook";
import LeetcodeIcon from "~icons/simple-icons/leetcode";
import CodeforcesIcon from "~icons/simple-icons/codeforces";
import PypiIcon from "~icons/simple-icons/pypi";
import AnacondaIcon from "~icons/simple-icons/anaconda";

defineProps<{ kind: LinkKind }>();

const icons: Record<LinkKind, unknown> = {
  website: WebsiteIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  orcid: OrcidIcon,
  scholar: ScholarIcon,
  researchgate: ResearchGateIcon,
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  leetcode: LeetcodeIcon,
  codeforces: CodeforcesIcon,
  pypi: PypiIcon,
  anaconda: AnacondaIcon,
};
</script>
