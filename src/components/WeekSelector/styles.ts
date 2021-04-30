import { RectButton } from 'react-native-gesture-handler'

import styled from 'styled-components/native'

export const Container = styled.View`
 flexDirection: row;
 justifyContent: space-between;
`

interface Props {
	isActive?: boolean;
}

export const ButtonContainer = styled(RectButton) <Props>`
 padding:12px;
 borderRadius:200px;
 height:46px;
 width:46px;
 alignItems:center;
 justifyContent:center;
 backgroundColor: ${props => props.isActive ? props.theme.colors.green : 'transparent'};
`

export const ButtonText = styled.Text<Props>`
 fontSize:22px;
 color:${props => props.theme.colors.heading};
 fontFamily: ${props => props.isActive ? props.theme.fonts.heading : props.theme.fonts.text};
`
