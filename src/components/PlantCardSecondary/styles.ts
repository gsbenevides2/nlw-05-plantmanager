import { RectButton } from 'react-native-gesture-handler'

import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  width: 100%;
  paddingHorizontal: 10px;
  paddingVertical: 25px;
  borderRadius: 20px;
  flexDirection: row;
  alignItems: center;
  backgroundColor: ${props => props.theme.colors.shape};
  marginVertical: 5px;
`
export const Title = styled.Text`
  flex: 1;
  marginLeft: 10px;
  fontFamily: ${props => props.theme.fonts.heading};
  fontSize: 17px;
  color: ${props => props.theme.colors.heading};
`
export const Details = styled.View`
  alignItems: flex-end;
  marginRight: 6px;
`
export const TimeLabel = styled.Text`
  fontSize: 16px;
  fontFamily: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.bodyLight};
`
export const Time = styled.Text`
  marginTop: 5px;
  fontSize: 16px;
  fontFamily: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.bodyDark};
`
export const ButtonRemove = styled(RectButton)`
  width: 100px;
  height: 85px;
  backgroundColor: ${props => props.theme.colors.red};
  marginTop: 15px;
  borderRadius: 20px;
  justifyContent: center;
  alignItems: center;
  position: relative;
  right: 20px;
  paddingLeft: 15px;
`
