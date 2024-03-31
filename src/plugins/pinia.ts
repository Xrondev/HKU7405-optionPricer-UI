import {defineStore} from "pinia";
import {computed, ComputedRef, Ref, ref} from "vue";

type CalculationInfo = {
    name: string | undefined; url: string; params: string[]; info: string | null;
}[]

type SelectedInfo = {
    name: string | undefined; url: string; params: string[]; info: string | null;
}

export const useStore = defineStore('store', () => {
    const calculationInfo: Ref<CalculationInfo> = ref([])
    const selectedCalculation: Ref<SelectedInfo | null> = ref(null)

    const helperInfo: ComputedRef<{ explanation: string, parameterInfo: Record<string, any> }> = computed(() => {
        let pydoc = selectedCalculation.value?.info;
        if (!pydoc) return {explanation: '', parameterInfo: {}};
        const explanationMatch = pydoc.match(/^(.*?)(?= :param)/s);
        const explanation = explanationMatch ? explanationMatch[0].trim() : '';

        // Extract the parameters and their explanations
        const paramRegex = /:param (\w+): (.*?)(?=( :param| :return|$))/gs;
        let paramMatch;
        const parameterInfo: Record<string, string> = {};
        let cnt = 0;
        while ((paramMatch = paramRegex.exec(pydoc)) !== null && cnt++ < 50) {
            parameterInfo[paramMatch[1]] = paramMatch[2].trim();
        }

        return {explanation, parameterInfo};

    })

    return {
        calculationInfo, selectedCalculation, helperInfo
    }
})