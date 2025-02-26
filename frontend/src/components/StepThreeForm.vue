<template>
  <div>
    <h1 v-if="showTitle">Senha de acesso</h1>

    <div class="form-group">
      <label>Sua senha</label>
      <input
        type="text"
        v-model="modelValue.senha" />
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'showTitle']);
</script>
