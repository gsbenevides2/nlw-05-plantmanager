import React from 'react'

import { ThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    green: '#32B768',
    greenDark: '#2B7A4B',
    greenLight: '#DAF2E4',

    heading: '#52665A',
    bodyDark: '#738078',
    bodyLight: '#AAB2AD',

    background: '#FFFFFF',
    shape: '#F0F0F0',
    white: '#FFFFFF',
    gray: '#CFCFCF',

    blue: '#3D7199',
    blueLight: '#EBF6FF',

    red: '#E83F5B'
  },
  fonts: {
    heading: 'Jost_600SemiBold',
    text: 'Jost_400Regular',
    complement: 'Jost_400Regular'
  }
}

interface Props {
  children: React.ReactNode
}

export const Theme: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
