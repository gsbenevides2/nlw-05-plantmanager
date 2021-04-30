import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  alignItems: center;
  justifyContent: space-around;
`
export const Content = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  width: 100%;
  padding: 30px;
`
export const Title = styled.Text`
  fontSize: 22px;
  fontFamily: ${props => props.theme.fonts.heading};
  textAlign: center;
  color: ${props => props.theme.colors.heading};
  lineHeight: 38px;
  marginTop: 15px;
`
export const Subtitle = styled.Text`
  fontFamily: ${props => props.theme.fonts.text};
  textAlign: center;
  fontSize: 17px;
  paddingVertical: 10px;
  color: ${props => props.theme.colors.heading};
`

export const Emoji = styled.Text`
  fontSize: 78px;
`

export const Footer = styled.View`
  width: 100%;
  paddingHorizontal: 50px;
  marginTop: 20px;
`
