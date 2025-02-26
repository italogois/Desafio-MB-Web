<template>
  <div>
    <h1 v-if="showTitle">Pessoa física</h1>

    <div class="form-group">
      <label>Nome</label>
      <input
        type="text"
        v-model="modelValue.nome" />
    </div>

    <div
      class="form-group"
      :class="{ hasError: cpfError }">
      <label>CPF</label>
      <input
        type="text"
        v-model="modelValue.cpf"
        @input="onlyNumber($event, 'cpf')"
        @blur="validateCpf(modelValue.cpf)" />

      <span
        v-if="cpfError"
        class="input-error-message"
        >{{ cpfError }}</span
      >
    </div>

    <div class="form-group">
      <label>Data de nascimento</label>
      <input
        type="date"
        v-model="modelValue.dataNascimento" />
    </div>

    <div
      class="form-group"
      :class="{ hasError: phoneError }">
      <label>Telefone</label>
      <input
        type="tel"
        v-model="modelValue.telefone"
        @input="onlyNumber($event, 'telefone')"
        @blur="validatePhone(modelValue.telefone)" />
      <span
        v-if="phoneError"
        class="input-error-message"
        >{{ phoneError }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { isCpfValid } from '../validators/cpfValidator.js';

import { isValidPhone } from '../validators/phoneValidator.js';

const props = defineProps(['modelValue', 'showTitle']);

const cpfError = ref(null);
const phoneError = ref(null);

const validateCpf = (value) => {
  if (!isCpfValid(value)) {
    cpfError.value = 'CPF inválido';
  } else {
    cpfError.value = null;
  }
};

const validatePhone = (value) => {
  if (!isValidPhone(value)) {
    phoneError.value = 'Telefone inválido';
  } else {
    phoneError.value = null;
  }
};

const onlyNumber = (event, inputName) => {
  props.modelValue[inputName] = event.target.value.replace(/\D/g, '');
};
</script>
