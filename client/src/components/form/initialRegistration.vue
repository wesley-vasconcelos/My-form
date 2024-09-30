<template>
  <Container currentPage="1" title="Seja bem-vindo(a)">
    <template #content>
      <Form
        @submit="submit"
        :validation-schema="schema"
        v-slot="{ errors, submitForm }"
      >
        <label for="email">Endereço de e-mail:</label>
        <Field
          name="email"
          id="email"
          type="email"
          v-model="localData.email"
          class="input"
        />

        <span class="error">{{ errors.email }}</span>

        <div class="mt-20">
          <label for="tipoCadastro">Tipo de cadastro:</label>
          <div class="flex">
            <div class="flex">
              <Field
                type="radio"
                name="tipoCadastro"
                id="pf"
                value="Pessoa Física"
                v-model="localData.tipoCadastro"
                class="radio-input"
              />
              <label for="pf">Pessoa Física</label>
            </div>
            <div class="flex radio-input_left">
              <Field
                type="radio"
                name="tipoCadastro"
                id="pj"
                value="Pessoa Jurídica"
                v-model="localData.tipoCadastro"
                class="radio-input"
              />
              <label for="pj">Pessoa Jurídica</label>
            </div>
          </div>

          <span class="error">{{ errors.tipoCadastro }}</span>
        </div>

        <div class="navigation">
          <button type="submit" class="button">Próximo</button>
        </div>
      </Form>
    </template>
  </Container>
</template>

<script setup>
import { ref } from "vue";

import { Form, Field } from "vee-validate";
import * as yup from "yup";

import Container from "@/components/container/container.vue";

const emit = defineEmits(["nextStep", "updateFormData"]);

const props = defineProps({
  email: String,
  tipoCadastro: String,
});

const localData = ref({
  email: props.email,
  tipoCadastro: props.tipoCadastro,
});

const schema = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  tipoCadastro: yup.string().required("O tipo de cadastro é obrigatório"),
});

const submit = (values) => {
  emit("updateFormData", values);
  emit("nextStep");
};
</script>
