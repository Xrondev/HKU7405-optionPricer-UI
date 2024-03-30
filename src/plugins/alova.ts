import {createAlova, Method} from "alova";
import {axiosRequestAdapter} from "@alova/adapter-axios";

const alovaInstance = createAlova({
    beforeRequest<S, E, RC, RE, RH>(method: Method<S, E, any, any, RC, RE, RH>): void | Promise<void> {
        return undefined;
    },
    cacheLogger: undefined,
    errorLogger: undefined,
    responded: undefined,
    statesHook: undefined,
    baseURL: "http://localhost:7405",
    requestAdapter: axiosRequestAdapter(),
})