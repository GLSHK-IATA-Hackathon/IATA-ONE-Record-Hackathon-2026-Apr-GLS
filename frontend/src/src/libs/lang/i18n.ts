import {createI18n} from 'vue-i18n'
import en from './en.json'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: en
    },
    escapeParameterHtml: false, // Disable HTML escaping for parameters,
    messageCompiler: (str) => str
})

export default i18n