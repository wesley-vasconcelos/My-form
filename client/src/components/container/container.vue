<template>
  <div class="step">
    <p class="step_description">
      Etapa <span class="step_current">{{ currentPage }}</span> de 4
    </p>
    <h1>{{ title }}</h1>
    <slot name="content" />
  </div>
</template>
<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
