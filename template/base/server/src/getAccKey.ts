export function getAccKey() {
    const accountsKeys = {
        key: [
            {
                apiKey: (process.env[""]) as string,
            }
        ],
    }
    return accountsKeys
}
export type accKey = ReturnType<typeof getAccKey>
