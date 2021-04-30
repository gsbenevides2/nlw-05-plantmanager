import styled from 'styled-components/native'

export const ContainerSafeArea = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  alignItems: center;
  justifyContent: space-around;
`

export const ContainerKeyboard = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  alignItems: center;
  justifyContent: space-around;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;
`

export const Form = styled.View`
  flex: 1;
  justifyContent: center;
  paddingHorizontal: 54px;
  alignItems: center;
`

export const Header = styled.View`
  alignItems: center;
`

export const Emoji = styled.Text`
  fontSize: 44px;
`

interface InputProps {
	isActive: boolean
}

export const Input = styled.TextInput<InputProps>`
  borderBottomWidth: 1px;
  borderColor: ${props =>
		props.isActive ? props.theme.colors.green : props.theme.colors.gray};
  color: ${props => props.theme.colors.heading};
  width: 100%;
  marginTop: 50px;
  padding: 10px;
  textAlign: center;
`

export const Title = styled.Text`
  fontSize: 24px;
  lineHeight: 32px;
  textAlign: center;
  color: ${props => props.theme.colors.heading};
  fontFamily: ${props => props.theme.fonts.heading};
  marginTop: 20px;
`

export const Footer = styled.View`
  width: 100%;
  marginTop: 40px;
  paddingHorizontal: 20px;
`
