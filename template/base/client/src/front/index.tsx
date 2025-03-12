import {createRoot} from "react-dom/client";
import {Main} from "./main";
import {GridStyleDefault} from "wenay-react";
import {ApiAccount} from "../utils/apiFacade";
GridStyleDefault()
function GeneralReact() {
    console.log("test11111 11")
    // addDownAnyKey()
    return <div style={{width: "100%", height:"100%"}} >

        <Main api={ApiAccount}/>
    </div>
}


function GeneralInit(pare:HTMLElement){
    const root = createRoot(pare!); // createRoot(container!) if you use TypeScript
    root.render(<GeneralReact />)
}


export function StartReact(){
    document.body.style.margin = '0'

    const buf = document.createElement("project");
    buf.style.width = '100%';
    buf.style.height = '100%';
    document.body.appendChild(buf)

    GeneralInit(buf)
}