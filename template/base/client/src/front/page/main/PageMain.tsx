import { FResizableReact, staticGetAdd, StyleOtherRow, updateBy } from "wenay-react";
import {ApiAccount} from "../../../utils/apiFacade";


export function PageMain({api: api_}:{api: ApiAccount}) {
    const api = api_.facade.openAi.all
    return (
        <div className="maxSize">
            <div className="toSpaceColum" style={{ height: "100%" }}>
                <div className="toSpace" style={{ height: "100%", width: "100vw", ...StyleOtherRow }}>
                    <FResizableReact
                        keyForSave="s2"
                        enable={{ right: true }}
                        size={{ width: "20%", height: "100%" }}
                    >
                        <div className="borderRight" style={{ width: "100%", height: "100%" }} >
                            <div onClick={async ()=> {
                                console.log("click")
                                const tr = await api.ping()
                                console.log(tr);
                            }}>click</div>
                        </div>
                    </FResizableReact>
                    <div style={{ width: "100%", height: "100%" }}><PageMain2/></div>
                </div>
            </div>
        </div>
    );
}

export function PageMain2() {


    return <div className={"maxSize"} style={{display: 'flex', flexDirection: 'column-reverse'}}>
        <div>

        </div>
        <div style={{
            display: "flex",         // Флекс-контейнер
            justifyContent: "center", // Горизонтальное выравнивание по центру
            alignItems: "center",     // Вертикальное выравнивание по центру
            width: "100%",
            height: "20%",
            lineHeight: "1",       // Меньше, чем высота поля, чтобы текст шел сверху
            paddingTop: "4px",     // Отступ сверху


        }}
        >
            <input className="text-input"
                   style={{
                       overflow: "auto", // Сохраняем прокрутку, если много текста
                       outline: "none",
                       whiteSpace: "pre-wrap",   // Для переноса внутри блока
                       maxWidth: "100%",

                   }}
                   type="text" />
        </div>
    </div>
}