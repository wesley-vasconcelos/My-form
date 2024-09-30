<template>
  <Container currentPage="3" title="Senha de acesso">
    <template #content>
      <Form
        @submit="submit"
        :validation-schema="schema"
        v-slot="{ errors, submitForm, touched }"
      >
        <div>
          <label for="senha">Senha de Acesso:</label>
          <Field
            name="senha"
            id="senha"
            type="password"
            v-model="localData.senha"
          />
          <br />
          <span class="error" v-if="errors.senha">{{ errors.senha }}</span>
        </div>

        <div class="mt-20">
          <label for="confirmarSenha">Confirmar Senha:</label>
          <Field
            name="confirmarSenha"
            id="confirmarSenha"
            type="password"
            v-model="localData.confirmarSenha"
          />
          <br />
          <span class="error" v-if="errors.confirmarSenha">{{
            errors.confirmarSenha
          }}</span>
        </div>

        <div class="navigation">
          <button
            class="button-secondary"
            type="button"
            @click="$emit('prevStep')"
          >
            Voltar
          </button>
          <button class="button" type="submit">Continuar</button>
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
  senha: String,
  confirmarSenha: String,
});

const localData = ref({
  senha: props.senha,
  confirmarSenha: props.confirmarSenha,
});

const schema = yup.object({
  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmarSenha: yup
    .string()
    .required("A confirmação de senha é obrigatória")
    .oneOf([yup.ref("senha")], "As senhas não coincidem"),
});

const submit = (values, { setTouched, errors }) => {
  setTouched({
    senha: true,
    confirmarSenha: true,
  });

  if (!errors) {
    emit("updateFormData", values);
    emit("nextStep");
  }
};
</script>
