import { RectButton } from 'react-native-gesture-handler'

import styled from 'styled-components/native'
interface Props {
	active: boolean
}

export const Container = styled(RectButton) <Props>`
  backgroundColor: ${props =>
		props.active ? props.theme.colors.greenLight : props.theme.colors.shape};
  width: 76px;
  height: 40px;
  justifyContent: center;
  alignItems: center;
  borderRadius: 12px;
  marginHorizontal: 5px;
`

export const Text = styled.Text<Props>`
  color: ${props =>
		props.active ? props.theme.colors.greenDark : props.theme.colors.heading};
  fontFamily: ${props =>
		props.active ? props.theme.fonts.heading : props.theme.fonts.text};
`
