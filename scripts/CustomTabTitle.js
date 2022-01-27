export class CustomTabTitle {
    static MODULE_ID = 'custom-tab-title'
    static CONFIG_TEXT = 'text'
    static CONFIG_ACTIVE = 'active'
    static CONFIG_SCENE = 'scene'
    static IS_ACTIVE = false
    static USE_SCENE = false
    static CURRENT_SCENE = null
    static CUSTOM_TEXT = null
    static ORIGINAL_TITLE = null

    static async registerConfig() {
        if (!game.settings.hasOwnProperty(this.MODULE_ID)) {
            game.settings.register(this.MODULE_ID, this.CONFIG_ACTIVE, {
                name:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_ACTIVE}.name`),
                hint:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_ACTIVE}.hint`),
                scope:    "world",
                config:   true,
                type:     Boolean,
                default:  true,
                onChange: async () => {
                    await this.onUpdatedConfig()
                }
            })

            game.settings.register(this.MODULE_ID, this.CONFIG_SCENE, {
                name:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_SCENE}.name`),
                hint:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_SCENE}.hint`),
                scope:    "world",
                config:   true,
                type:     Boolean,
                default:  false,
                onChange: async () => {
                    await this.onUpdatedConfig()
                }
            })

            game.settings.register(this.MODULE_ID, this.CONFIG_TEXT, {
                name:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_TEXT}.name`),
                hint:     game.i18n.localize(`${this.MODULE_ID}.settings.${this.CONFIG_TEXT}.hint`),
                scope:    "world",
                config:   true,
                type:     String,
                default:  "Custom Tab Title",
                onChange: async () => {
                    await this.onUpdatedConfig()
                }
            })
        }

        await this.onUpdatedConfig()
    }

    static async onUpdatedConfig() {
        this.IS_ACTIVE = game.settings.get(this.MODULE_ID, this.CONFIG_ACTIVE)
        this.USE_SCENE = game.settings.get(this.MODULE_ID, this.CONFIG_SCENE)
        this.CUSTOM_TEXT = game.settings.get(this.MODULE_ID, this.CONFIG_TEXT)

        if (this.ORIGINAL_TITLE === null) {
            this.ORIGINAL_TITLE = document.title
        }

        if (this.IS_ACTIVE) {
            if (this.USE_SCENE) {
                document.title = game.scenes.viewed.data.navName.length > 0 ? game.scenes.viewed.data.navName : game.scenes.viewed.name
            }
            else {
                document.title = this.CUSTOM_TEXT
            }
        }
        else {
            document.title = this.ORIGINAL_TITLE
        }
    }
}