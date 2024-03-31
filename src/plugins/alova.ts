import {createAlova, Method} from "alova";
import VueHook from "alova/vue";
import {axiosRequestAdapter} from "@alova/adapter-axios";
import {AxiosResponse} from "axios";

export const alovaInstance = createAlova({
    beforeRequest<S, E, RC, RE, RH>(method: Method<S, E, any, any, RC, RE, RH>): void | Promise<void> {
        return undefined;
    },
    cacheLogger: undefined,
    errorLogger: undefined,
    responded: undefined,
    statesHook: VueHook,
    baseURL: "http://localhost:7405",
    requestAdapter: axiosRequestAdapter(),
    localCache: null,
})

export type CalculationTypeList = {
    [url: string]: {
        display_name: string;
        params: string[];
        info: string | null;
    };
};

export type CalculationType = {
    name?: string;
    display_name?: string;
    params: string[];
    info: string | null;
};
export const getCalculationTypes = alovaInstance.Get('/', {
    transformData(rawData: AxiosResponse, headers) {
        const response = rawData.data as CalculationTypeList;
        console.log(response)
        const result =  Object.entries(response).map(([url, details]:[string, CalculationType]) => ({
            name: details.display_name,
            url,
            params: details.params,
            info: details.info,
        }))
        console.log(result)
        return result
    },
});

export const getCalculationResults = (functionName: string, params: any) => alovaInstance.Get(`/calc/${functionName}`, {
    params,
    transformData(rawData: AxiosResponse, headers) {
        console.log(rawData.data)
        return rawData.data.result;
    },
});