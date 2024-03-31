<template>
  <div id="sidebar">
    <div style="width:100%; padding: 5px; height: 100%">
      <InputText
          v-model="inputCalType"
          placeholder="Search"
          style="width:100%;"
      />
      <Divider/>
      <Listbox
          v-model="selectedCalType"
          :options="filteredCalculationTypes"
          class="custom-scrollbar"
          option-label="name"
          style="width:100%; max-height: calc(90vh - 100px); overflow-y: auto;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useStore} from "@/plugins/pinia";

// Setup ref for calculation types
const props = defineProps<{
  calculationTypes: Array<any>
}>()
console.log(props.calculationTypes)


const inputCalType = ref("");
const selectedCalType = ref(null);

// Computed property to filter calculation types
const filteredCalculationTypes = computed(() => {
  if (!inputCalType.value) {
    return props.calculationTypes
  }
  return props.calculationTypes.filter(type =>
      type.name.toLowerCase().includes(inputCalType.value.toLowerCase())
  );
});

const store = useStore();

watch(()=>selectedCalType.value, (newVal) => {
  console.log(newVal)
  store.selectedCalculation = newVal;
}, {immediate: true})
</script>

<style scoped>
#sidebar {
  width: 30vw;
  height: 100%;
  max-height: 100%;
  border-right: 1px solid #e0e0e0;
  -webkit-user-select: none;
}


</style>