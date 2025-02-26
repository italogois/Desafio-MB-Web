<template>
  <div>
    <h1 v-if="showTitle">Seja bem vindo(a)</h1>

    <div
      class="form-group"
      :class="{ hasError: emailError }">
      <label>Endereço de e-mail</label>

      <input
        type="text"
        v-model="modelValue.email"
        @blur="validateEmail(modelValue.email)" />
      <span
        v-if="emailError"
        class="input-error-message"
        >{{ emailError }}</span
      >
    </div>

    <div
      v-if="stepOneTipoPessoa"
      class="form-group">
      <div class="radio-group-wrapper">
        <div class="radio-group">
          <label>
            <input
              type="radio"
              value="pessoaFisica"
              v-model="modelValue.tipoPessoa" />
            Pessoa física
          </label>
        </div>

        <div class="radio-group">
          <label>
            <input
              type="radio"
              value="pessoaJuridica"
              v-model="modelValue.tipoPessoa" />
            Pessoa jurídica
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { isValidEmail } from '../validators/emailValidator.js';

defineProps(['modelValue', 'showTitle', 'stepOneTipoPessoa']);

const emailError = ref(null);

const validateEmail = (value) => {
  emailError.value = !isValidEmail(value) ? 'E-mail inválido' : null;
};
</script>

<style scoped>
.radio-group-wrapper {
  display: flex;
  align-items: center;
  gap: 30px;
}
</style>
