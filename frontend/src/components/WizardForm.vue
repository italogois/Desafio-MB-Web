<template>
  <div class="wizard-container">
    <div class="step-info">
      Etapa <span class="current-step">{{ currentStep + 1 }}</span> de <span class="total-steps">{{ totalSteps }}</span>
    </div>

    <component
      :is="getCurrentStepComponent"
      :formWizardData="formWizardData"
      :showTitle="true"
      :stepOneTipoPessoa="true"
      v-model="getCurrentStepData" />

    <div class="button-group">
      <button
        @click="prevStep"
        v-if="currentStep > 0"
        class="btn btn-outline">
        Voltar
      </button>

      <button
        @click="nextStep"
        v-if="currentStep < steps.length - 1"
        class="btn btn-primary">
        Próximo
      </button>

      <button
        @click="submitForm"
        v-if="currentStep === steps.length - 1"
        class="btn btn-primary">
        Cadastrar
      </button>
    </div>

    <div
      v-if="apiErrorMessage || isInvalidForm"
      class="card-error-message">
      {{ apiErrorMessage || 'Todos os campos são obrigatórios' }}
    </div>

    <div
      v-if="apiSuccessMessage"
      class="card-success-message">
      {{ apiSuccessMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import StepOneForm from './StepOneForm.vue';
import StepTwoPFForm from './StepTwoPFForm.vue';
import StepTwoPJForm from './StepTwoPJForm.vue';
import StepThreeForm from './StepThreeForm.vue';
import StepFourForm from './StepFourForm.vue';
import { register } from '../service/registerService';

const steps = [StepOneForm, StepTwoPFForm, StepThreeForm, StepFourForm];
const apiErrorMessage = ref(null);
const apiSuccessMessage = ref(null);
const currentStep = ref(0);
const isInvalidForm = ref(null);
const formWizardData = ref({
  stepOneForm: { email: '', tipoPessoa: '' },
  stepTwoPFForm: { nome: '', cpf: '', dataNascimento: '', telefone: '' },
  stepTwoPJForm: { razaoSocial: '', cnpj: '', dataAbertura: '', telefone: '' },
  stepThreeForm: { senha: '' },
  stepFourForm: {},
});

const nextStep = () => {
  if (apiSuccessMessage) {
    apiSuccessMessage.value = null;
  }

  isInvalidForm.value = false;

  Object.keys(getCurrentStepData.value).forEach((key) => {
    if (!getCurrentStepData.value[key]) {
      isInvalidForm.value = true;
    }
  });

  if (isInvalidForm.value) {
    return;
  }

  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  isInvalidForm.value = false;

  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const getCurrentStepComponent = computed(() => {
  if (currentStep.value === 1) {
    return formWizardData.value.stepOneForm.tipoPessoa === 'pessoaFisica' ? StepTwoPFForm : StepTwoPJForm;
  }
  return steps[currentStep.value];
});

const getCurrentStepData = computed(() => {
  switch (currentStep.value) {
    case 0:
      return formWizardData.value.stepOneForm;
    case 1:
      return formWizardData.value.stepOneForm.tipoPessoa === 'pessoaFisica'
        ? formWizardData.value.stepTwoPFForm
        : formWizardData.value.stepTwoPJForm;

    case 2:
      return formWizardData.value.stepThreeForm;

    case 3:
      return formWizardData.value.stepFourForm;

    default:
      break;
  }
});

const totalSteps = computed(() => steps.length);

const resetForm = () => {
  currentStep.value = 0;

  formWizardData.value = {
    stepOneForm: { email: '', tipoPessoa: '' },
    stepTwoPFForm: { nome: '', cpf: '', dataNascimento: '', telefone: '' },
    stepTwoPJForm: { razaoSocial: '', cnpj: '', dataAbertura: '', telefone: '' },
    stepThreeForm: { senha: '' },
    stepFourForm: {},
  };

  setTimeout(() => {
    apiSuccessMessage.value = null;
  }, 3000);
};

const cleanValueToSend = () => {
  const valueFormPayload = {
    stepOneForm: formWizardData.value.stepOneForm,
    stepThreeForm: formWizardData.value.stepThreeForm,
  };

  if (formWizardData.value.stepOneForm.tipoPessoa === 'pessoaFisica') {
    valueFormPayload.stepTwoPFForm = formWizardData.value.stepTwoPFForm;
  } else {
    valueFormPayload.stepTwoPJForm = formWizardData.value.stepTwoPJForm;
  }

  return valueFormPayload;
};

const isValidPayload = () => {
  const formPayload = cleanValueToSend();

  for (const key in formPayload) {
    for (const keyForm in formPayload[key]) {
      if (!formPayload[key][keyForm]) {
        return false;
      }
    }
  }

  return true;
};

const submitForm = async () => {
  if (!isValidPayload()) {
    isInvalidForm.value = true;
    return;
  }

  isInvalidForm.value = false;

  const response = await register(cleanValueToSend());

  if (!response.ok) {
    const errorData = await response.json();
    apiSuccessMessage.value = null;
    apiErrorMessage.value = errorData.error;
    return;
  }

  const successData = await response.json();
  apiErrorMessage.value = null;
  apiSuccessMessage.value = successData.message;

  resetForm();
};
</script>

<style scoped>
.wizard-container {
  margin: auto;
  width: 600px;
}

.step-info {
  font-size: 14px;
  color: #333;

  .current-step {
    font-weight: bold;
    color: #f7931e;
  }
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 35px;
  gap: 15px;

  .btn {
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
    width: 100%;

    &.btn-outline {
      background: transparent;
      color: #f7931e;
      border: 1px solid #f7931e;

      &:hover {
        background: #f7931e;
        color: white;
      }
    }

    &.btn-primary {
      background: #f7931e;
      color: white;

      &:hover {
        background: #ee8409;
      }
    }
  }
}
</style>
