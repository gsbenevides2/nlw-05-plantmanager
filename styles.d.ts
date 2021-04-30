import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      green: string
      greenDark: string
      greenLight: string
      heading: string
      bodyDark: string
      bodyLight: string
      background: string
      shape: string
      white: string
      gray: string
      blue: string
      blueLight: string
      red: string
    }
    fonts: {
      heading: string
      text: string
      complement: string
    }
  }
}
