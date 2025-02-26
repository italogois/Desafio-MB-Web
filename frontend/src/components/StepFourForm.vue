<template>
  <div>
    <h1 v-if="showTitle">Revise suas informações</h1>

    <StepOneForm
      v-model="formWizardData['stepOneForm']"
      :showTitle="false" />

    <StepTwoPFForm
      v-if="isPessoaFisica"
      v-model="formWizardData['stepTwoPFForm']"
      :showTitle="false" />

    <StepTwoPJForm
      v-if="isPessoaJuridica"
      v-model="formWizardData['stepTwoPJForm']"
      :showTitle="false" />

    <StepThreeForm
      v-model="formWizardData['stepThreeForm']"
      :showTitle="false" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StepTwoPFForm from './StepTwoPFForm.vue';
import StepTwoPJForm from './StepTwoPJForm.vue';
import StepThreeForm from './StepThreeForm.vue';
import StepOneForm from './StepOneForm.vue';

const props = defineProps(['formWizardData', 'showTitle']);

const isPessoaFisica = computed(() => props.formWizardData['stepOneForm'].tipoPessoa === 'pessoaFisica');

const isPessoaJuridica = computed(() => props.formWizardData['stepOneForm'].tipoPessoa === 'pessoaJuridica');
</script>
