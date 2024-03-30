<script setup lang="ts">

import TitleBar from "./components/TitleBar.vue";
import CalculationTypeList from "./components/CalculationTypeList.vue";
import MainDisplay from "./components/MainDisplay.vue";
</script>

<template>
    <TitleBar/>
    <div id="main">
      <CalculationTypeList/>
      <MainDisplay/>
    </div>
</template>

<style>
#main {
  display: flex;

}
</style>
