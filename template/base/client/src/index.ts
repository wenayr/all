import { Cash } from "wenay-react";
import {StartReact} from "./front/index";

window.onload = async function() {
    Cash.load().then(()=>{
        StartReact()
    })
}


