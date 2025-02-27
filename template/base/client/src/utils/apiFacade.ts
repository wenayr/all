import {io} from "socket.io-client";
import type {FacadeSystemWeb} from "../../../server/src/system/facade";
import {CreatAPIFacadeClient} from "wenay-common";


export const ApiAccount = (() => {
    const {onConnect, connectCount, ...facade} = InitFacadeCAccount()
    return {facade, onConnect, connectCount}
})()
export type ApiAccount = typeof ApiAccount


export function InitFacadeCAccount() {
    const fullUrl = location.protocol + '//' + location.hostname + ':4021'
    // const fullUrl = "http://127.0.0.1:4021"
    const socket = io(fullUrl, {
        transports: ['websocket'],
        query: {
            token: "JdnEf42bD9f3Fn"//this.auth.getToken()
        },
        forceNew: true,
        timeout: 90000,
    });
    const openAi = CreatAPIFacadeClient<FacadeSystemWeb>({socketKey: "openAI", socket})


    type t = typeof openAi.all

    socket.on('disconnect', (reason) => {
        console.log("disconnect")
    });
    socket.on('connect_error', (reason) => {
        console.log("connect_error")
    });
    socket.on('toast', (data) => {
        console.log("toast")
    });
    let connect: null | ((connectCount: number) => void) = null;
    let connectCount = 0
    socket.on('connect', () => {
        connectCount++
        console.log("connect InitFacadeCAccount")
        connect?.(connectCount)
    });
    return {
        openAi,
        onConnect(func?: null | ((connectCount: number) => void)) {
            connect = func ?? null;
        }, connectCount(){return connectCount}
    }
}