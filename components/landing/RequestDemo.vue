<template>
  <section id="request-demo" class="border-b border-glass py-section">
    <BaseSection class="gap-y-12">
      <div class="col-span-12 lg:col-span-5">
        <BaseHeading>
          Request a demo
          <template #lead>
            Planning to use FEZrs in a course, a research group or a production workflow? Tell us about your
            data and goals, and we will walk you through the tools that fit.
          </template>
        </BaseHeading>
        <p class="mt-6 text-sm text-fez-500">
          You can also write to
          <a :href="`mailto:${contactEmail}`" class="text-fez-200 underline underline-offset-4">{{ contactEmail }}</a>.
        </p>
      </div>

      <div class="col-span-12 lg:col-span-6 lg:col-start-7">
        <div class="glass rounded-lg p-6 sm:p-8">
          <div v-if="submitted" role="status" class="py-6">
            <CheckIcon class="text-4xl text-fez-50" aria-hidden="true" />
            <h3 class="mt-4 text-xl font-semibold text-fez-50">Thank you, your request is ready</h3>
            <p class="mt-2 text-sm leading-relaxed text-fez-400">
              Online submission is not connected yet. Send the request by email so it reaches the team.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <BaseButton :href="mailto">Send by email</BaseButton>
              <BaseButton variant="ghost" @click="reset">Edit request</BaseButton>
            </div>
          </div>

          <form v-else novalidate class="space-y-5" @submit.prevent="submit">
            <div>
              <label for="demo-email" class="field-label">Email</label>
              <input
                id="demo-email"
                v-model.trim="email"
                type="email"
                autocomplete="email"
                class="field"
                placeholder="name@university.edu"
                :aria-invalid="touched && !emailValid"
                aria-describedby="demo-email-error"
              />
              <p v-if="touched && !emailValid" id="demo-email-error" class="mt-1.5 text-xs text-cc-300">
                Enter an email address like name@example.com.
              </p>
            </div>
            <div>
              <label for="demo-org" class="field-label">Organization</label>
              <input
                id="demo-org"
                v-model.trim="organization"
                type="text"
                autocomplete="organization"
                class="field"
                placeholder="University, lab or company"
                :aria-invalid="touched && !organization"
                aria-describedby="demo-org-error"
              />
              <p v-if="touched && !organization" id="demo-org-error" class="mt-1.5 text-xs text-cc-300">
                Enter your organization.
              </p>
            </div>
            <div>
              <label for="demo-message" class="field-label">What would you like to see? <span class="text-fez-500">(optional)</span></label>
              <textarea
                id="demo-message"
                v-model.trim="message"
                rows="3"
                class="field resize-y"
                placeholder="Sensors, study area, the analysis you have in mind"
              />
            </div>
            <BaseButton type="submit" class="w-full sm:w-auto">Request a demo</BaseButton>
          </form>
        </div>
      </div>
    </BaseSection>
  </section>
</template>

<script setup lang="ts">
import CheckIcon from "~icons/material-symbols-light/check-circle-outline";

// UI only: nothing is sent from the page. The thank-you state offers a
// prefilled mailto link instead.
const contactEmail = "info@feztool.com";

const email = ref("");
const organization = ref("");
const message = ref("");
const touched = ref(false);
const submitted = ref(false);

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));

const mailto = computed(() => {
  const body = `Email: ${email.value}\nOrganization: ${organization.value}\n\n${message.value}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent("FEZtool demo request")}&body=${encodeURIComponent(body)}`;
});

const submit = () => {
  touched.value = true;
  if (emailValid.value && organization.value) submitted.value = true;
};
const reset = () => (submitted.value = false);
</script>
