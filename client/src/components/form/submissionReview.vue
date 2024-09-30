<template>
  <Container currentPage="4" title="Revise suas informações">
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
        <br />
        <span class="error mb-10">{{ errors.email }}</span>

        <div class="mt-20" v-if="localData.tipoCadastro === 'Pessoa Física'">
          <label for="nome">Nome Completo:</label>
          <Field
            name="nome"
            id="nome"
            type="text"
            v-model="localData.nome"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.nome }}</span>

          <label class="mt-20" for="cpf">CPF:</label>
          <Field
            name="cpf"
            id="cpf"
            type="text"
            v-model="localData.cpf"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.cpf }}</span>

          <label class="mt-20" for="dataNascimento">Data de Nascimento:</label>
          <Field
            name="dataNascimento"
            id="dataNascimento"
            type="date"
            v-model="localData.dataNascimento"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.dataNascimento }}</span>
        </div>

        <div class="mt-20" v-if="localData.tipoCadastro === 'Pessoa Jurídica'">
          <label for="razaoSocial">Razão Social:</label>
          <Field
            name="razaoSocial"
            id="razaoSocial"
            type="text"
            v-model="localData.razaoSocial"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.razaoSocial }}</span>

          <label class="mt-20" for="cnpj">CNPJ:</label>
          <Field
            name="cnpj"
            id="cnpj"
            type="text"
            v-model="localData.cnpj"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.cnpj }}</span>

          <label class="mt-20" for="dataAbertura">Data de Abertura:</label>
          <Field
            name="dataAbertura"
            id="dataAbertura"
            type="date"
            v-model="localData.dataAbertura"
            class="input"
          />
          <br />
          <span class="error mb-10">{{ errors.dataAbertura }}</span>
        </div>

        <label class="mt-20" for="telefone">Número de Telefone:</label>
        <Field
          name="telefone"
          id="telefone"
          type="text"
          v-model="localData.telefone"
          class="input"
        />
        <br />
        <span class="error mb-10">{{ errors.telefone }}</span>

        <label class="mt-20" for="senha">Senha de Acesso:</label>
        <Field
          name="senha"
          id="senha"
          type="password"
          v-model="localData.senha"
          class="input"
        />
        <br />
        <span class="error mb-10">{{ errors.senha }}</span>

        <label class="mt-20" for="confirmarSenha">Confirmar Senha:</label>
        <Field
          name="confirmarSenha"
          id="confirmarSenha"
          type="password"
          v-model="localData.confirmarSenha"
          class="input"
        />
        <br />
        <span class="error mb-10">{{ errors.confirmarSenha }}</span>

        <div class="navigation">
          <button class="button-secondary" @click="$emit('prevStep')">
            Voltar
          </button>
          <button class="button" type="submit">Finalizar</button>
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

const emit = defineEmits(["prevStep", "submitForm"]);

const props = defineProps({
  email: { type: String, required: true },
  tipoCadastro: { type: String, required: true },
  nome: { type: String, required: false },
  cpf: { type: String, required: false },
  razaoSocial: { type: String, required: false },
  cnpj: { type: String, required: false },
  dataNascimento: { type: String, required: false },
  dataAbertura: { type: String, required: false },
  telefone: { type: String, required: false },
  senha: { type: String, required: true },
  confirmarSenha: { type: String, required: true },
});

const localData = ref({
  email: props.email || "",
  tipoCadastro: props.tipoCadastro || "",
  nome: props.nome || "",
  cpf: props.cpf || "",
  razaoSocial: props.razaoSocial || "",
  cnpj: props.cnpj || "",
  dataNascimento: props.dataNascimento || "",
  dataAbertura: props.dataAbertura || "",
  telefone: props.telefone || "",
  senha: props.senha || "",
  confirmarSenha: props.confirmarSenha || "",
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
        email: yup.string().required("A senha  é obrigatório"),
        senha: yup.string().required("A senha  é obrigatório"),
        confirmarSenha: yup
          .string()
          .required("É obrigatório confirmar a senha"),
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
        email: yup.string().required("A senha  é obrigatório"),
        senha: yup.string().required("A senha  é obrigatório"),
        confirmarSenha: yup
          .string()
          .required("É obrigatório confirmar a senha"),
      });

const submit = (values) => {
  emit("submitForm", values);
};
</script>
