import { Dimensions } from 'react-native'

import styled from 'styled-components/native'

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`
export const Wrapper = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: space-around;
  paddingHorizontal: 20px;
`

export const Header = styled.Text`
  color: ${props => props.theme.colors.heading};
  fontSize: 28px;
  fontWeight: bold;
  textAlign: center;
  marginTop: 38px;
  lineHeight: 34px;
  fontFamily: ${props => props.theme.fonts.heading};
`

export const Img = styled.Image`
  height: ${() => Dimensions.get('window').width * 0.7}px;
`

export const Description = styled.Text`
  color: ${props => props.theme.colors.heading};
  textAlign: center;
  fontSize: 18px;
  paddingHorizontal: 20px;
  fontFamily: ${props => props.theme.fonts.text};
`
