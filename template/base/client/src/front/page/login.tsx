export function Login({onClick}: {onClick: ({pas, login})=> void}) {
    let pas = "", login =""
    return <div style={{position: "absolute", left: "30%", top: "30%", width: "40%", height: "40%"}}>
        <label>{"login"}</label>
        <input type={"text"} style={{width: "100%", marginBottom:10}} onChange={(e) => {
            login = e.target.value ?? ""
        }}/>
        <label>{"password"}</label>
        <input type={"text"} style={{width: "100%"}} onChange={(e) => {
            pas = e.target.value ?? ""
        }}/>
        <div className={'msTradeAlt'} style={{marginTop: 20}}
            onClick={() => {
                onClick({login, pas})
            }}
        >submit
        </div>
    </div>
}
