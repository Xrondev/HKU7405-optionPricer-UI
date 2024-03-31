<template>
  <Toolbar class="app-header">
    <template #start>
      <div class="drag-area">Option Pricer</div>
    </template>

    <template #end>
      <div>
      <ButtonGroup>
        <Button icon="pi pi-github"/>
        <Button icon="pi pi-times" @click="closeWindow" />
      </ButtonGroup></div>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import ButtonGroup from "primevue/buttongroup";
import remote from "electron";


const openSettings = () => {
  // Logic to open settings
};

const closeWindow = () => {
  window.ipcRenderer.closeWindow();
};
</script>

<style>
.app-header {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  display: flex;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #e0e0e0;
}

.drag-area {
  font-weight: 500;
  font-size: 1.5rem;
  -webkit-app-region: drag;
}

button {
  -webkit-app-region: no-drag;
  /* Style your buttons */
}
</style>
