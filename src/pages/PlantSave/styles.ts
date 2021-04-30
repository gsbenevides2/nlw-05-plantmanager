import { StyleProp, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import styled from 'styled-components/native'

import { theme } from '../../theme'

export const Constainer = styled.View`
  flex: 1;
  justifyContent: space-between;
  backgroundColor: ${props => props.theme.colors.shape};
`
export const ScrollViewContainer: StyleProp<ViewStyle> = {
  flexGrow: 1,
  justifyContent: 'space-between',
  backgroundColor: theme.colors.shape
}
export const PlantInfo = styled.View`
  flex: 1;
  paddingHorizontal: 30px;
  paddingVertical: 50px;
  alignItems: center;
  justifyContent: center;
  backgroundColor: ${props => props.theme.colors.shape};
`
export const Controller = styled.View`
  backgroundColor: ${props => props.theme.colors.white};
  paddingHorizontal: 20px;
  paddingTop: 20px;
  paddingBottom: ${getBottomSpace() || 20}px;
`
export const PlantName = styled.Text`
  fontFamily: ${props => props.theme.fonts.heading};
  fontSize: 24px;
  color: ${props => props.theme.colors.heading};
  marginTop: 15px;
`
export const PlantAbout = styled.Text`
  textAlign: center;
  fontFamily: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.heading};
  fontSize: 17px;
  marginTop: 10px;
`
export const TipContainer = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  backgroundColor: ${props => props.theme.colors.blueLight};
  padding: 20px;
  borderRadius: 20px;
  position: relative;
  bottom: 60px;
`
export const TipImage = styled.Image`
  width: 56px;
  height: 56px;
`
export const TipText = styled.Text`
  flex: 1;
  marginLeft: 20px;
  fontFamily: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.blue};
  fontSize: 17px;
  textAlign: justify;
`
export const AlertLabel = styled.Text`
  textAlign: center;
  fontFamily: ${props => props.theme.fonts.complement};
  color: ${props => props.theme.colors.heading};
  fontSize: 12px;
  marginBottom: 5px;
`

export const DateTimePickerButton = styled(TouchableOpacity)`
  width: 100%;
  alignItems: center;
  paddingVertical: 40px;
`
export const DateTimePickerText = styled.Text`
  color: ${props => props.theme.colors.heading};
  fontSize: 24px;
  fontFamily: ${props => props.theme.fonts.text};
`
