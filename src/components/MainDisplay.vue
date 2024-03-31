<template>
  <ConfirmDialog></ConfirmDialog>
  <div id="display">
    <div style="height: 100%; position:relative">


      <div style="border-bottom: 1px solid #e0e0e0;padding-bottom:5px;margin-bottom: 10px;">
        <span style="font-weight: 400; font-size: 1rem; padding: 5px">{{ getName }}</span>
        <Button v-if="show" aria-label="information" icon="pi pi-question-circle" rounded severity="info" text
                @click="showInfoDialog()"/>
      </div>

      <div
          v-if="!show"
          style="height: 80%; width: 100%; display: flex; justify-content: center; align-items: center; color: #e0e0e0;"
      >
        <i class="pi pi-angle-double-left" style="font-size: 2.5rem"></i>
      </div>


      <div v-if="show"
          style="display: flex;flex-direction: row;min-height:calc(90vh - 5rem - 40px); padding: 10px; position:relative">
        <div style="width:50%; height: 100%;">
          <span style="font-weight: 300; font-size: 1rem; margin-bottom: 10px">Parameter List</span>
          <div class="custom-scrollbar" style="max-height: calc(90vh - 5rem - 80px); overflow:auto">
            <div v-for="param in parameterList"
                 :key="param.name"
                 style="display:flex; flex-direction: row; justify-content: space-between;align-items:center ; padding: 10px"
            >
              <span>{{ param.name }}</span>
              <InputText v-model="param.val" style="width:50%"/>

            </div>
          </div>
        </div>
        <div style="width:50%">
          <span style="font-weight: 300; font-size: 1rem">Calculation Result</span>
          <div
              style="height: 95%; display: flex; justify-content: center; align-items:center; flex-direction:column">
            Result
            <p>{{ result }}</p>

          </div>
        </div>
      </div>


      <div v-if="show" style="display:flex;position:absolute;bottom:5px; width:100%; box-sizing:border-box">
        <Button style="width:100%;justify-content:center" @click="calculate()">Calculate!</Button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import ConfirmDialog from "primevue/confirmdialog";
import {useConfirm} from "primevue/useconfirm";
import {computed, Ref, ref} from "vue";
import {useStore} from "@/plugins/pinia";
import {useRequest} from "alova";
import {getCalculationResults} from "@/plugins/alova";

const confirm = useConfirm()
const showInfoDialog = () => {
  console.log("showInfoDialog")
  confirm.require({
    message: store.selectedCalculation?.info ?? "This part does not have PyDoc comment.",
    header: 'Information',
    // icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'OK',
    rejectLabel: 'Cancel',
  })
};

const store = useStore();

var parameterList: Ref<{ val: string; name: string }[]> = ref([])

store.$subscribe((mutation, state) => {
  if (state.selectedCalculation !== null) {
    parameterList.value = state.selectedCalculation.params.map((item) => ({
      name: item,
      val: ''
    }))
  } else {
    parameterList.value = []
  }
})

const result = ref(0)
const {data, error, send} = useRequest((url, params) => getCalculationResults(url, params), {
  immediate: false,
  initialData: 0
})
const calculate = () => {
  console.log("calculate")
  const url = store.selectedCalculation?.url
  if (url === undefined) {

  } else {
    const params: Record<string, any> = {}
    parameterList.value.forEach((item) => {
      params[item.name] = item.val
    })
    console.log(params)
    send(url, params)
    if (error.value) {
      console.error(error.value)
    } else {
      result.value = data.value
    }
  }
}

const getName = computed(() => {
  if (store.selectedCalculation !== null) {
    return store.selectedCalculation.name
  }
  return "Select calculation from the left"
})

const show = computed(() => {
  return store.selectedCalculation !== null
})
</script>

<style scoped>
#display {
  width: 70vw;
  max-height: 100%;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  position: relative;
  -webkit-user-select: none;
}
</style>