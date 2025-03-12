import {deepModifyByListenSocket3, UnAwaited} from "wenay-common";
import {accKey} from "../getAccKey";

export async function getFacadeSystem({acc}: {acc: accKey}){
    return {
        ping(){return "pong"}
    }
}
type Facade = UnAwaited<ReturnType<typeof getFacadeSystem>>

export function getFacadeSystemWeb(data: Facade, d: Parameters<typeof deepModifyByListenSocket3>[1]) {
    if (!data) throw new Error('getFacade data = null')
    const result = deepModifyByListenSocket3(data, d)
    return {
        ...result,
    } as const
}

export type FacadeSystemWeb = ReturnType<typeof getFacadeSystemWeb>
