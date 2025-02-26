<template>
  <div>
    <h1 v-if="showTitle">Pessoa jurídica</h1>

    <div class="form-group">
      <label>Razão Social</label>
      <input
        type="text"
        v-model="modelValue.razaoSocial" />
    </div>

    <div
      class="form-group"
      :class="{ hasError: cnpjError }">
      <label>CNPJ</label>
      <input
        type="text"
        v-model="modelValue.cnpj"
        @input="onlyNumber($event, 'cnpj')"
        @blur="validateCnpj(modelValue.cnpj)" />

      <span
        v-if="cnpjError"
        class="input-error-message"
        >{{ cnpjError }}</span
      >
    </div>

    <div class="form-group">
      <label>Data de abertura</label>
      <input
        type="date"
        v-model="modelValue.dataAbertura" />
    </div>

    <div class="form-group">
      <label>Telefone</label>
      <input
        type="tel"
        v-model="modelValue.telefone"
        @input="onlyNumber($event, 'telefone')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isCnpjValid } from '../validators/cnpjValidator.js';

const props = defineProps(['modelValue', 'showTitle']);
const cnpjError = ref(null);

const onlyNumber = (event, inputName) => {
  props.modelValue[inputName] = event.target.value.replace(/\D/g, '');
};

const validateCnpj = (value) => {
  if (!isCnpjValid(value)) {
    cnpjError.value = 'CNPJ inválido';
  } else {
    cnpjError.value = null;
  }
};
</script>
