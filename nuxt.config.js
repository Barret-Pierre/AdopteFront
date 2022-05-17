import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - adoptefront',
        title: 'adoptefront',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://auth.nuxtjs.org/
        '@nuxtjs/auth-next',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.API_BASE_URL,
    },

    // Variable d'environnment
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
        IMAGE_FOLDER: process.env.IMAGE_FOLDER
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
                // light: {
                //     primary: colors.blue.darken2,
                //     accent: colors.grey.darken3,
                //     secondary: colors.amber.darken3,
                //     info: colors.teal.lighten1,
                //     warning: colors.amber.base,
                //     error: colors.deepOrange.accent4,
                //     success: colors.green.accent3,
                // },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    // auth: {
    //     strategies: {
    //         local: {
    //             endpoints: {
    //                 login: {
    //                     url: '/api/auth/login',
    //                     method: 'post',
    //                     propertyName: 'token'
    //                 },
    //                 logout: { url: '/api/auth/logout', method: 'post' },
    //                 user: {
    //                     url: '/api/me',
    //                     method: 'get',
    //                     propertyName: 'user'
    //                 }
    //             }
    //             // tokenRequired: true,
    //             // tokenType: 'bearer',
    //             // globalToken: true,
    //             // autoFetchUser: trues
    //         },
    //     },
    //     redirect: {
    //         login: false,
    //         logout: '/',
    //         callback: '/login',
    //         home: false
    //     },
    //     //plugins: ['~/plugins/extendauth.js']
    // },
    auth: {
        localStorage: false,
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login',
            home: '/'
        },
        watchLoggedIn: true,
        rewriteRedirects: false,
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    // required: true,
                    // type: 'Bearer'
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/api/me', method: 'get', propertyName: 'user' }
                }
            }
        }
    }
}