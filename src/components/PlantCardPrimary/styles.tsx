import { RectButton } from 'react-native-gesture-handler'

import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  flex: 1;
  maxWidth: 45%;
  backgroundColor: ${props => props.theme.colors.shape};
  borderRadius: 20px;
  paddingVertical: 10px;
  alignItems: center;
  margin: 10px;
`
export const Text = styled.Text`
  color: ${props => props.theme.colors.greenDark};
  fontFamily: ${props => props.theme.fonts.heading};
  marginVertical: 16px;
`
