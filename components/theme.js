import Color from 'color'

const background = '#ffd674'
const offWhite = '#F5F5F5'
const yellow = '#FAB100'
const orange = '#f37e20'
const green = '#699639'
const red = '#BF1E00'
const black = '#1F2D39'
const white = '#ffffff'

export const colors = {
  background,
  black,
  white,
  green,
  link: red,
  linkHover: Color(red).darken(0.1),
  btnLight: offWhite,
  btnLightText: black,
  btnLightHover: Color(offWhite).darken(0.1),
  btnDark: orange,
  btnDarkText: black,
  btnDarkHover: Color(orange).darken(0.1),
  btnDarkDisabled: Color(orange).lighten(0.5),
  headerStripe: red,
  footerBackground: red,
  footerText: white,
  footerTextHover: Color(white).darken(0.1),
  cardDark: `${red}!important`,
  dashboard: orange,
  dashboardText: white,
  dashboardMeterBackground: white,
  dashboardMeter: yellow,
  dashboardMeterCost: green,
  dashboardMeterOverCost: red,
  dashboardMeterTextDark: black,
  dashboardMeterTextLight: white,
  dashboardMeterTextLightShadow: 'rgba(0, 0, 0, 0.8)',
  strategy: offWhite,
  strategySelected: red,
  strategySelectedText: white,
  strategyBar: yellow,
  strategyCostSigns: green
}

export const breakpoints = {
  medium: '768px',
  large: '992px'
}
