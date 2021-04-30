import { Feather } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const Touchable = styled.TouchableOpacity`
  backgroundColor: ${props => props.theme.colors.green};
  justifyContent: center;
  alignItems: center;
  borderRadius: 16px;
  marginBottom: 10px;
  height: 56px;
  width: 56px;
`
export const Icon = styled(Feather)`
  fontSize: 32px;
  color: ${props => props.theme.colors.white};
`
