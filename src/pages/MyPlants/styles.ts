import { Dimensions, Platform } from 'react-native'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: space-between;
  paddingHorizontal: 30px;
  paddingTop: ${() => (Platform.OS === 'ios' ? 50 : 0)}px;
  backgroundColor: ${props => props.theme.colors.background};
`
export const Spotlight = styled.View`
  backgroundColor: ${props => props.theme.colors.blueLight};
  paddingHorizontal: 20px;
  borderRadius: 20px;
  height: 110px;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`
export const SpotlightImage = styled.Image`
  width: 60px;
  height: 60px;
`
export const SpotlightText = styled.Text`
  flex: 1;
  color: ${props => props.theme.colors.blue};
  paddingHorizontal: 20px;
`
export const Plants = styled.View`
  flex: 1;
  width: 100%;
`
export const PlantsTitle = styled.Text`
  fontSize: 24px;
  fontFamily: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.heading};
  marginVertical: 20px;
`
export const EmptyContainer = styled.View`
  flex: 1;
  alignItems: center;
  paddingTop: 50px;
  width: 100%;
`
export const EmptyTitle = styled.Text`
  fontSize: 24px;
  marginVertical: 10px;
  fontFamily: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.heading};
  textAlign: center;
`
export const EmptyImage = styled.Image`
  height: ${() => Dimensions.get('window').width * 0.7}px;
`
export const EmptySubtitle = styled.Text`
  fontSize: 18px;
  fontFamily: ${props => props.theme.fonts.text};
  color: ${props => props.theme.colors.heading};
  marginVertical: 5px;
  textAlign: center;
`
