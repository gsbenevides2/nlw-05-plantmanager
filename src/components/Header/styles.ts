import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { Feather } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  paddingVertical: 20px;
  marginTop: ${() => getStatusBarHeight()}px;
`
export const Image = styled.Image`
  width: 70px;
  height: 70px;
  borderRadius: 40px;
`
export const Greeting = styled.Text`
  fontSize: 32px;
  color: ${props => props.theme.colors.heading};
  fontFamily: ${props => props.theme.fonts.text};
`
export const Username = styled.Text`
  fontSize: 32px;
  fontFamily: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.heading};
  lineHeight: 40px;
`
export const Icon = styled(Feather)`
  fontSize: 32px;
  color: ${props => props.theme.colors.heading};
`
