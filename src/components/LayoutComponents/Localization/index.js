import React from 'react'
import { LocaleProvider } from 'antd'
import { IntlProvider, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import english from 'locales/en-US'
import french from 'locales/fr-FR'
import russian from 'locales/ru-RU'
import chinese from 'locales/zh-CH'
import kyrgyz from 'locales/ky-KG'

addLocaleData(english.localeData)
addLocaleData(french.localeData)
addLocaleData(russian.localeData)
addLocaleData(chinese.localeData)
addLocaleData(kyrgyz.localeData)

const locales = {
  'en-US': english,
  'fr-FR': french,
  'ru-RU': russian,
  'zh-CH': chinese,
  'ky-KG': kyrgyz,
}

@connect(({ settings }) => ({ settings }))
class Localization extends React.Component {
  render() {
    const {
      children,
      settings: { locale },
    } = this.props
    const currentLocale = locales[locale]
    return (
      <LocaleProvider locale={currentLocale.antdData}>
        <IntlProvider locale={currentLocale.locale} messages={currentLocale.messages}>
          {children}
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

export default Localization
