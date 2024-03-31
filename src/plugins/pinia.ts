import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {CalculationType} from "@/plugins/alova";

type CalculationInfo = {
    name: string | undefined; url: string; params: string[]; info: string | null;
}[]

type SelectedInfo = {
    name: string | undefined; url: string; params: string[]; info: string | null;
}

export const useStore = defineStore('store', () => {
    const calculationInfo: Ref<CalculationInfo> = ref([])
    const selectedCalculation:Ref<SelectedInfo|null> = ref(null)

    return {
        calculationInfo, selectedCalculation
    }
})