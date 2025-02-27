import {CreatAPIFacadeServer, UseListen} from "wenay-common";
import {Server} from "socket.io";
import * as express from 'express';
import * as path from "path";
import * as basicAuth from "express-basic-auth";
import {execSync} from "node:child_process";
import {getAccKey} from "./getAccKey";
import {getFacadeSystem, getFacadeSystemWeb} from "./system/facade";

const PORT = 4021

export const getRootPath = ()=>{
    let p = __dirname
    console.log("getRootPath");
    for (let i = 0;; i++) {
        if (path.basename(p) == 'server' && !p.includes('dist')) {
            const r = path.resolve(p, '../')
            console.log(r);
            return r
        }
        p = path.resolve(p, '../')
        if (i >= 10) return __dirname
    }
}

function getIo() {
    const app = (express)()
    const server = require('http').createServer(app)
    const io = new Server(server, {
        transports: ['websocket'],
        allowUpgrades: false,
        pingInterval: 2000, // default - 25000
        pingTimeout: 35000, // default - 60000
    })
    return {io, app, server}
}

const lastCommit = new Date((+execSync('git log -1 --format=%ct'))*1000)

export async function startOpenAiClient() {
    const accountsKeys = getAccKey()
    const main = await getFacadeSystem({acc: accountsKeys})
        .catch(e => {
            console.log(e);
            throw e
        })

    const {server, app, io} = getIo()

    io.use(async (socket, next) => {
        const token = socket.handshake.query['token'];
        if (token && token == 'JdnEf42bD9f3Fn') return next();
        else next(new Error('invalidToken'));
    });

    let c = 0
    let d = 0
    io.sockets.on('connection', async function(socket) {
        console.log("connection " + ++c, d)
        let status = true
        const [stop, listenStop] = UseListen<[]>()
        socket.on('disconnect', async(reason) => {
            stop()
            ++d;
            status = false
        })

        socket.on('error', async(error) => {
            console.warn(error)
            // socket.disconnect();
        })
        CreatAPIFacadeServer({object: getFacadeSystemWeb(main, {addListenClose: listenStop}), socketKey: "openAI", socket: socket})
    })



    app.post(
        "/openWithToken",
        // Нужно, чтобы понимать form-data. Для простых форм используем urlencoded
        express.urlencoded({ extended: true }),
        (req: express.Request, res: express.Response) => {
            // Проверка токена из тела формы
            const clientToken = req.body?.token;
            // Пример секретного "правильного" токена
            const VALID_TOKEN = "MY_CUSTOM_TOKEN_123";

            if (clientToken === VALID_TOKEN) {
                // Если токен совпал, отдаём наш index.html
                const pathClient = path.resolve(getRootPath(), "clientBacktest", "build");
                res.sendFile(path.resolve(pathClient, "index.html"));
                return;
            } else {
                res.status(401).send("Invalid token");
                return;
            }
        }
    );

    //
    const basicAuthOptions = {challenge: true, users: {}}
    basicAuthOptions.users[process.env['BASIC_AUTH_NAME'] ?? 'LKdnmQWkf3'] = (process.env['BASIC_AUTH_PASSWORD'] ?? 'LKdnmQWkf3')
    basicAuthOptions.users[`user`] = `password`
    app.use(basicAuth(basicAuthOptions));




    const pathClient = path.resolve(getRootPath(), 'client', 'build')
    console.log(pathClient);

    app.use(express.static(pathClient))
    console.log("ok")

    // app.get('*', (req, res) => {
    //     console.log("ok")
    //     res.sendFile(path.resolve(pathClient, 'index.html'))
    //     console.log("ok")
    // })


    const HOST = '0.0.0.0';
    server.listen(PORT, HOST, () => {
        console.log(`Server has been started on port:${PORT}`);
    });

}
