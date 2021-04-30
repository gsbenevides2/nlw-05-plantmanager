import React, { useState } from 'react'
import { DeviceEventEmitter, Platform, ScrollView } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { SvgFromUri } from 'react-native-svg'

import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/core'
import { format } from 'date-fns'

import waterdrop from '../../assets/waterdrop.png'
import { TextButton } from '../../components/TextButton'
import { WeekSelector } from '../../components/WeekSelector'
import { PlantData, savePlant, Week } from '../../libs/storage'
import * as Styled from './styles'

export interface PageData {
  data: PlantData
  selectedWeeks?: Week[]
  dateTimeNotification?: Date
}

interface Params {
  pageData: PageData
}

interface Props {
  route: { params: Params }
  navigation: ReturnType<typeof useNavigation>
}

export function PlantSaveScreen({
  route,
  navigation
}: Props): React.ReactElement {
  const { pageData } = route.params as Params
  const [selectedDateTime, setSelectedDateTime] = useState(
    pageData.dateTimeNotification || new Date()
  )
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')
  const [selectedWeeks, setSelectedWeeks] = useState(
    pageData.selectedWeeks || []
  )

  function handleChangeTime(_event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }
    if (dateTime) setSelectedDateTime(dateTime)
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...pageData,
        selectedWeeks,
        dateTimeNotification: selectedDateTime
      })
      console.log('ok')
      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: `Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.`,
        buttonTitle: 'Muito obrigado',
        icon: 'hug',
        nextScreen: 'goBack'
      })
      DeviceEventEmitter.emit('@plantmanager:plant_save')
    } catch (e) {
      console.log(e)
      showMessage({
        message: 'Não foi possível salvar. 😢',
        type: 'danger'
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={Styled.ScrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <Styled.Constainer>
        <Styled.PlantInfo>
          <SvgFromUri uri={pageData.data.photo} height={150} width={150} />
          <Styled.PlantName>{pageData.data.name}</Styled.PlantName>
          <Styled.PlantAbout>{pageData.data.about}</Styled.PlantAbout>
        </Styled.PlantInfo>

        <Styled.Controller>
          <Styled.TipContainer>
            <Styled.TipImage source={waterdrop} />
            <Styled.TipText>{pageData.data.water_tips}</Styled.TipText>
          </Styled.TipContainer>
          {pageData.data.frequency.times === 1 &&
          pageData.data.frequency.repeat_every === 'day' ? (
            <Styled.AlertLabel>
              Escolha o melhor horário para ser lembrado todos os dias:
            </Styled.AlertLabel>
          ) : (
            <>
              <Styled.AlertLabel>
                Escolha o melhor horário e dia da semana para ser lembrado:
              </Styled.AlertLabel>
              <WeekSelector
                value={selectedWeeks}
                onValue={value => {
                  setSelectedWeeks(value)
                }}
                qtdOfWeeks={pageData.data.frequency.times}
              />
            </>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === 'android' && (
            <Styled.DateTimePickerButton
              onPress={handleOpenDatetimePickerForAndroid}
            >
              <Styled.DateTimePickerText>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Styled.DateTimePickerText>
            </Styled.DateTimePickerButton>
          )}

          <TextButton text="Cadastrar Plantinha" onPress={handleSave} />
        </Styled.Controller>
      </Styled.Constainer>
    </ScrollView>
  )
}
