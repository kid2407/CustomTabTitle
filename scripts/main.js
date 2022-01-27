import {CustomTabTitle} from "./CustomTabTitle.js"

Hooks.once('ready', async function () {
    await CustomTabTitle.registerConfig()
})
