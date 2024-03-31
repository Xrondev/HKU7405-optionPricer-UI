<template>
  <Toolbar class="app-header">
    <template #start>
      <div class="drag-area">Option Pricer</div>
    </template>

    <template #end>
      <div>
      <ButtonGroup>
        <Button icon="pi pi-github" @click="dialog = true"/>
        <Button icon="pi pi-minus" @click="minimizeWindow"/>
        <Button icon="pi pi-times" @click="closeWindow" />
      </ButtonGroup></div>
      <Dialog v-model:visible="dialog" modal header="Visit our Github Repository" :style="{width: '50vw'}">
        <div style="width:100%; display:flex; flex-direction:column;align-items:center">
          <Button style="width:80%; margin: 5px" @click="openBrowser('python')">Python Source Code for Calculation Implement</Button>
          <Button style="width:80%; margin: 5px" @click="openBrowser('GUI')">Graphical User Interface Program</Button>
        </div>
      </Dialog>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import ButtonGroup from "primevue/buttongroup";
import remote from "electron";
import {ref} from "vue";

const dialog = ref(false)


const openSettings = () => {
  // Logic to open settings
};

const openBrowser = (loc: string) => {
  if (loc === 'python') {
    window.ipcRenderer.send("open-browser", 'https://github.com/atair-ibn-laahad/7405-assignment3');
  }else{
    window.ipcRenderer.send("open-browser", 'https://github.com/Xrondev/HKU7405-optionPricer-UI');
  }
};

const minimizeWindow = () => {
  window.ipcRenderer.send("minimize-window");
};

const closeWindow = () => {
  window.ipcRenderer.send("close-window");
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
