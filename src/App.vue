<template>
    <TitleBar id="title" />
    <div id="main">
      <CalculationTypeList :calculationTypes="data"/>
      <MainDisplay/>
    </div>
</template>
<script setup lang="ts">

import TitleBar from "./components/TitleBar.vue";
import CalculationTypeList from "./components/CalculationTypeList.vue";
import MainDisplay from "./components/MainDisplay.vue";

import {getCalculationTypes} from "@/plugins/alova";
import {useRequest} from "alova";
import {useStore} from "@/plugins/pinia";

const store = useStore();

// Fetch calculation types from the server

const {data, error} = useRequest(() => getCalculationTypes, {immediate: true, initialData: []});

if (error.value) {
  console.error(error.value);
}else {
  store.calculationInfo = data.value;
}


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
