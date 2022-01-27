import {CustomTabTitle} from "./CustomTabTitle.js"

Hooks.once('ready', async function () {
    await CustomTabTitle.registerConfig()
    CustomTabTitle.CURRENT_SCENE = game.scenes.viewed.id

    Hooks.on('canvasReady', async function (canvas) {
        if (canvas.scene.id !== CustomTabTitle.CURRENT_SCENE) {
            CustomTabTitle.CURRENT_SCENE = canvas.scene.id
            await CustomTabTitle.onUpdatedConfig()
        }
    })
})
