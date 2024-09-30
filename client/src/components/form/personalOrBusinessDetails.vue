<template>
  <Container
    currentPage="2"
    :title="
      tipoCadastro === 'Pessoa Física' ? 'Pessoa Física' : 'Pessoa Jurídica'
    "
  >
    <template #content>
      <Form
        @submit="submit"
        :validation-schema="schema"
        v-slot="{ errors, submitForm }"
      >
        <div v-if="localData.tipoCadastro === 'Pessoa Física'">
          <label for="nome">Nome Completo:</label>
          <Field name="nome" id="nome" type="text" v-model="localData.nome" />
          <br />
          <span class="error mb-10" v-if="errors.nome">{{ errors.nome }}</span>

          <label class="mt-20" for="cpf">CPF:</label>
          <Field
            name="cpf"
            id="cpf"
            v-mask="'###.###.###-##'"
            v-model="localData.cpf"
          />
          <br />
          <span class="error mb-10" v-if="errors.cpf">{{ errors.cpf }}</span>

          <label class="mt-20" for="dataNascimento">Data de Nascimento:</label>
          <Field
            name="dataNascimento"
            id="dataNascimento"
            type="date"
            v-model="localData.dataNascimento"
          />
          <br />
          <span class="error mb-10" v-if="errors.dataNascimento">{{
            errors.dataNascimento
          }}</span>

          <label class="mt-20" for="telefone">Número de Telefone:</label>
          <Field
            name="telefone"
            id="telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            v-model="localData.telefone"
          />
          <br />
          <span class="error mb-10" v-if="errors.telefone">{{
            errors.telefone
          }}</span>
        </div>

        <div v-if="localData.tipoCadastro === 'Pessoa Jurídica'">
          <label for="razaoSocial">Razão Social:</label>
          <Field
            name="razaoSocial"
            id="razaoSocial"
            type="text"
            v-model="localData.razaoSocial"
          />
          <br />
          <span class="error mb-10" v-if="errors.razaoSocial">{{
            errors.razaoSocial
          }}</span>

          <label class="mt-20" for="cnpj">CNPJ:</label>
          <Field
            name="cnpj"
            id="cnpj"
            v-mask="'##.###.###/####-##'"
            v-model="localData.cnpj"
          />
          <br />
          <span class="error mb-10" v-if="errors.cnpj">{{ errors.cnpj }}</span>

          <label class="mt-20" for="dataAbertura">Data de Abertura:</label>
          <Field
            name="dataAbertura"
            id="dataAbertura"
            type="date"
            v-model="localData.dataAbertura"
          />
          <br />
          <span class="error mb-10" v-if="errors.dataAbertura">{{
            errors.dataAbertura
          }}</span>

          <label class="mt-20" for="telefone">Número de Telefone:</label>
          <Field
            name="telefone"
            id="telefone"
            type="text"
            v-model="localData.telefone"
          />
          <br />
          <span class="error mb-10" v-if="errors.telefone">{{
            errors.telefone
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
          <button type="submit" class="button">Continuar</button>
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
  tipoCadastro: String,
  nome: String,
  cpf: String,
  razaoSocial: String,
  cnpj: String,
  dataNascimento: String,
  dataAbertura: String,
  telefone: String,
});

const localData = ref({
  tipoCadastro: props.tipoCadastro,
  nome: props.nome,
  cpf: props.cpf,
  razaoSocial: props.razaoSocial,
  cnpj: props.cnpj,
  dataNascimento: props.dataNascimento,
  dataAbertura: props.dataAbertura,
  telefone: props.telefone,
});

const schema =
  props.tipoCadastro === "Pessoa Física"
    ? yup.object({
        nome: yup.string().required("O nome  é obrigatório"),
        cpf: yup.string().required("O cpf  é obrigatório"),
        dataNascimento: yup
          .date()
          .nullable()
          .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
          })
          .max(new Date(), "Data de nascimento inválida ou futura.")
          .required("A data de nascimento é obrigatória"),
        telefone: yup.string().required("O telefone  é obrigatório"),
      })
    : yup.object({
        cnpj: yup.string().required("O cnpj  é obrigatório"),

        dataAbertura: yup
          .date()
          .nullable()
          .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
          })
          .max(new Date(), "Data de abertura inválida ou futura.")
          .required("A data de abertura é obrigatória"),
        telefone: yup.string().required("O telefone  é obrigatório"),
        razaoSocial: yup.string().required("A razao social  é obrigatório"),
      });

const submit = (values) => {
  emit("updateFormData", values);
  emit("nextStep");
};
</script>
