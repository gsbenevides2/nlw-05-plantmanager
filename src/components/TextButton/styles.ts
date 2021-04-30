import styled from 'styled-components/native'

export const Touchable = styled.TouchableOpacity`
  backgroundColor: ${props => props.theme.colors.green};
  justifyContent: center;
  alignItems: center;
  borderRadius: 16px;
  marginBottom: 10px;
  height: 56px;
  paddingHorizontal: 10px;
`
export const TextContent = styled.Text`
  fontSize: 24px;
  color: ${props => props.theme.colors.white};
`
