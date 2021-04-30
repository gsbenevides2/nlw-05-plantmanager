import React from 'react'

import { Week } from '../../libs/storage'
import * as Styled from './styles'

interface Props {
  value: Week[]
  onValue: (value: Week[]) => void
  qtdOfWeeks: number
}

export function WeekSelector({
  value,
  onValue,
  qtdOfWeeks
}: Props): React.ReactElement {
  function handleWeek(week: Week) {
    let oldWeeks = [...value]
    if (oldWeeks.includes(week)) {
      oldWeeks = oldWeeks.filter(value => value !== week)
    } else {
      if (qtdOfWeeks === oldWeeks.length) oldWeeks.pop()

      oldWeeks.push(week)
    }
    onValue(oldWeeks)
  }

  return (
    <Styled.Container>
      <Styled.ButtonContainer
        onPress={() => handleWeek(1)}
        isActive={value.includes(1)}
      >
        <Styled.ButtonText isActive={value.includes(1)}>D</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(2)}
        isActive={value.includes(2)}
      >
        <Styled.ButtonText isActive={value.includes(2)}>S</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(3)}
        isActive={value.includes(3)}
      >
        <Styled.ButtonText isActive={value.includes(3)}>T</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(4)}
        isActive={value.includes(4)}
      >
        <Styled.ButtonText isActive={value.includes(4)}>Q</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(5)}
        isActive={value.includes(5)}
      >
        <Styled.ButtonText isActive={value.includes(5)}>Q</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(6)}
        isActive={value.includes(6)}
      >
        <Styled.ButtonText isActive={value.includes(6)}>S</Styled.ButtonText>
      </Styled.ButtonContainer>

      <Styled.ButtonContainer
        onPress={() => handleWeek(7)}
        isActive={value.includes(7)}
      >
        <Styled.ButtonText isActive={value.includes(7)}>S</Styled.ButtonText>
      </Styled.ButtonContainer>
    </Styled.Container>
  )
}
