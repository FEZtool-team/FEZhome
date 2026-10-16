<template>
  <section id="contact" class="border-b border-glass py-section">
    <BaseSection class="gap-y-12">
      <div class="col-span-12 lg:col-span-5">
        <BaseHeading>
          Contact and community
          <template #lead>
            Questions about the tools, collaboration proposals or bug reports are all welcome. For code issues,
            GitHub is the fastest route.
          </template>
        </BaseHeading>
        <ul class="mt-10 divide-y divide-glass border-y border-glass">
          <li v-for="channel in channels" :key="channel.href">
            <a
              :href="channel.href"
              :target="channel.href.startsWith('http') ? '_blank' : undefined"
              :rel="channel.href.startsWith('http') ? 'noopener' : undefined"
              class="flex items-center gap-4 py-4 text-fez-300 transition-colors hover:text-fez-50"
            >
              <component :is="channel.icon" class="text-xl" aria-hidden="true" />
              <span class="text-fez-100">{{ channel.label }}</span>
              <span class="ml-auto truncate text-sm text-fez-500">{{ channel.handle }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-12 lg:col-span-6 lg:col-start-7">
        <div class="glass rounded-lg p-6 sm:p-8">
          <div v-if="submitted" role="status" class="py-6">
            <CheckIcon class="text-4xl text-fez-50" aria-hidden="true" />
            <h3 class="mt-4 text-xl text-fez-50">Thank you, your message is ready</h3>
            <p class="mt-2 text-sm leading-relaxed text-fez-400">
              Online submission is not connected yet. Send the message by email so it reaches the team.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <BaseButton :href="mailto">Send by email</BaseButton>
              <BaseButton variant="ghost" @click="submitted = false">Edit message</BaseButton>
            </div>
          </div>

          <form v-else novalidate class="space-y-5" @submit.prevent="submit">
            <div>
              <label for="contact-email" class="field-label">Email</label>
              <input
                id="contact-email"
                v-model.trim="email"
                type="email"
                autocomplete="email"
                class="field"
                placeholder="name@example.com"
                :aria-invalid="touched && !emailValid"
                aria-describedby="contact-email-error"
              />
              <p v-if="touched && !emailValid" id="contact-email-error" class="mt-1.5 text-xs text-cc-300">
                Enter an email address like name@example.com.
              </p>
            </div>
            <div>
              <label for="contact-message" class="field-label">Message</label>
              <textarea
                id="contact-message"
                v-model.trim="message"
                rows="5"
                class="field resize-y"
                placeholder="How can we help?"
                :aria-invalid="touched && !message"
                aria-describedby="contact-message-error"
              />
              <p v-if="touched && !message" id="contact-message-error" class="mt-1.5 text-xs text-cc-300">
                Write a message before sending.
              </p>
            </div>
            <BaseButton type="submit" class="w-full sm:w-auto">Send message</BaseButton>
          </form>
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import CheckIcon from "~icons/material-symbols-light/check-circle-outline";
import MailIcon from "~icons/material-symbols-light/mail-outline";
import GithubIcon from "~icons/mdi/github";
import LinkedinIcon from "~icons/mdi/linkedin";
import InstagramIcon from "~icons/mdi/instagram";
import RedditIcon from "~icons/mdi/reddit";

// UI only: nothing is sent from the page; see RequestDemo.vue.
const contactEmail = "info@feztool.com";

const channels = [
  { label: "Email", handle: contactEmail, href: `mailto:${contactEmail}`, icon: MailIcon },
  { label: "GitHub", handle: "FEZtool-team", href: "https://github.com/FEZtool-team", icon: GithubIcon },
  { label: "LinkedIn", handle: "feztool", href: "https://www.linkedin.com/company/feztool", icon: LinkedinIcon },
  { label: "Instagram", handle: "@fez.tool", href: "https://www.instagram.com/fez.tool", icon: InstagramIcon },
  { label: "Reddit", handle: "r/FEZtool", href: "https://www.reddit.com/r/FEZtool/", icon: RedditIcon },
];

const email = ref("");
const message = ref("");
const touched = ref(false);
const submitted = ref(false);

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const mailto = computed(
  () =>
    `mailto:${contactEmail}?subject=${encodeURIComponent("Message from feztool website")}&body=${encodeURIComponent(
      `From: ${email.value}\n\n${message.value}`
    )}`
);

const submit = () => {
  touched.value = true;
  if (emailValid.value && message.value) submitted.value = true;
};
</script>
