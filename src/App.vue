<template>
  <TitleBar id="title"/>
  <div id="main">
    <CalculationTypeList :calculationTypes="data"/>
    <MainDisplay/>
  </div>
</template>
<script lang="ts" setup>

import TitleBar from "./components/TitleBar.vue";
import CalculationTypeList from "./components/CalculationTypeList.vue";
import MainDisplay from "./components/MainDisplay.vue";

import {getCalculationTypes} from "@/plugins/alova";
import {useRequest} from "alova";
import {useStore} from "@/plugins/pinia";
import {useConfirm} from "primevue/useconfirm";
import {watch} from "vue";

const store = useStore();

// Fetch calculation types from the server

const {data, error} = useRequest(() => getCalculationTypes, {immediate: true, initialData: []});
const confirm = useConfirm()
store.calculationInfo = data.value;
watch(error, (value)=>{
  console.log('error', value)
  if (value !== undefined){
    confirm.require({
      message: 'Cannot connect to the local server, did you start the api_entries script?',
      header: 'Warning',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Quit',
      rejectLabel: 'Cancel',
      reject() {
        window.ipcRenderer.closeWindow();
      },
      accept() {
        window.ipcRenderer.closeWindow();
      },
    })
  }
})

</script>

<style>
#title {
  height: 10vh;
}

#main {
  display: flex;
  height: 90vh;
  max-height: 90vh;
}
</style>
