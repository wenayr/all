import {getRootPath, startOpenAiClient} from "./facadeRun";
import * as dotenv from "dotenv";
import * as path from "path";
import * as process from "process";
import {sleepAsync, TF} from "wenay-common";


console.log(TF.M15.sec);
// import * as dns from "dns";
// dns.setDefaultResultOrder("ipv4first")
// require("net").setDefaultAutoSelectFamily(false);
const env = path.resolve(getRootPath(), '.env')
console.log(env);
const l = dotenv.config({path: env})
console.log(l);
// console.log(process.env['TINKOFF_TOKEN']);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    if (p instanceof Error) {
        console.log(p['stack']);
        console.log(p);
    }

    ///TODO это временно надо исправить
    if (typeof reason == "string" && reason.includes("busy")) {
        console.log("busy")
        return;
    }

    process.exit()
    // application specific logging, throwing an error, or other logic here
    // application specific logging, throwing an error, or other logic here
});

// tets 22
startOpenAiClient()
