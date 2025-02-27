import {PageMain} from "./page/main/PageMain";
import {ApiAccount} from "../utils/apiFacade";

export function Main({api}:{api: ApiAccount}){
    return <div className={"maxSize"}>
        <PageMain api={api}/>
    </div>
}