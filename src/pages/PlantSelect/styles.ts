import { StyleProp, ViewStyle } from 'react-native'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.colors.background};
`
export const HeaderContainer = styled.View`
  paddingHorizontal: 30px;
`
export const Title = styled.Text`
  fontSize: 17px;
  color: ${props => props.theme.colors.heading};
  fontFamily: ${props => props.theme.fonts.heading};
  lineHeight: 20px;
  marginTop: 15px;
`
export const Subtitle = styled.Text`
  fontFamily: ${props => props.theme.fonts.text};
  fontSize: 17px;
  lineHeight: 20px;
  color: ${props => props.theme.colors.heading};
`
export const EnviromentList: StyleProp<ViewStyle> = {
  height: 40,
  justifyContent: 'center',
  paddingBottom: 5,
  marginVertical: 32
}
export const Plants = styled.View`
  flex: 1;
  paddingHorizontal: 32px;
  justifyContent: center;
`
