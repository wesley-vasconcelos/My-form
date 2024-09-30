<template>
  <div class="container">
    <component
      :is="steps[currentStep]"
      :formData="formData"
      v-bind="formData"
      @nextStep="nextStep"
      @prevStep="prevStep"
      @updateFormData="updateFormData"
      @submitForm="submitForm"
    ></component>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useToast } from "vue-toastification";

import InitialRegistration from "@/components/form/initialRegistration.vue";
import PersonalOrBusinessDetails from "@/components/form/personalOrBusinessDetails.vue";
import AccessPasswordForm from "@/components/form/accessPasswordForm.vue";
import SubmissionReview from "@/components/form/submissionReview.vue";

import { apiBaseURL } from "@/services/apiService";

const toast = useToast();
const currentStep = ref(0);

const steps = [
  InitialRegistration,
  PersonalOrBusinessDetails,
  AccessPasswordForm,
  SubmissionReview,
];

const formData = ref({
  email: "",
  tipoCadastro: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  razaoSocial: "",
  cnpj: "",
  dataAbertura: "",
  senha: "",
});

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const updateFormData = (newData) => {
  formData.value = { ...formData.value, ...newData };
};

const submitForm = async (value) => {
  try {
    const response = await fetch(`${apiBaseURL}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      const errorData = await response.json();

      const errorMessage =
        errorData.message || "Erro ao processar a requisição";

      if (errorData.errors && Array.isArray(errorData.errors)) {
        const errorDetails = errorData.errors
          .map((error) => error.message)
          .join(", ");
        throw new Error(`${errorMessage} ${errorDetails}`);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    toast.success(data.message || "Seu cadastro foi realizado com sucesso.");

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } catch (error) {
    console.error("Erro:", error);
    toast.error(error.message || "Ocorreu um erro inesperado.");
  }
};
</script>
