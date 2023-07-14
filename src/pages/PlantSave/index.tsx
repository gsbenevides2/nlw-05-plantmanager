import React, { useState } from "react";
import { DeviceEventEmitter, Platform, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SvgFromUri } from "react-native-svg";

import DateTimePicker, {
  DateTimePickerEvent,
  Event,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import waterdrop from "../../assets/waterdrop.png";
import { TextButton } from "../../components/TextButton";
import { WeekSelector } from "../../components/WeekSelector";
import { PlantData, savePlant, Week } from "../../libs/storage";
import * as Styled from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { StackScreensProps } from "../../routes/types";

export interface PageData {
  data: PlantData;
  selectedWeeks?: Week[];
  hour?: number;
  minute?: number;
}

type Props = StackScreenProps<StackScreensProps, "PlantSave">;

function currentWeekDay(): Week {
  const weekDay = new Date().getDay();
  const week: Week = (weekDay === 0 ? 6 : weekDay + 1) as Week;
  return week;
}

function getDay(hour: number, minute: number): Date {
  const now = new Date();
  now.setHours(hour, minute);
  return now;
}

export function PlantSaveScreen({
  route,
  navigation,
}: Props): React.ReactElement {
  const { pageData } = route.params;
  const [selectedDateTime, setSelectedDateTime] = useState(
    pageData.hour && pageData.minute
      ? getDay(pageData.hour, pageData.minute)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");
  const [selectedWeeks, setSelectedWeeks] = useState(
    pageData.selectedWeeks || [currentWeekDay()]
  );

  function handleChangeTime(
    _event: DateTimePickerEvent,
    dateTime: Date | undefined
  ) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }
    if (dateTime) setSelectedDateTime(dateTime);
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
    try {
      if (!selectedWeeks.length) {
        return showMessage({
          message: "Selecione ao menos um dia da semana. 😢",
          type: "danger",
        });
      }
      if (selectedWeeks.length > pageData.data.frequency.times) {
        return showMessage({
          message: `Selecione no máximo ${pageData.data.frequency.times} dias da semana. 😢`,
          type: "danger",
        });
      }
      if (selectedWeeks.length < pageData.data.frequency.times) {
        return showMessage({
          message: `Selecione ao menos ${pageData.data.frequency.times} dias da semana. 😢`,
          type: "danger",
        });
      }
      await savePlant({
        ...pageData,
        selectedWeeks,
        hour: selectedDateTime.getHours(),
        minute: selectedDateTime.getMinutes(),
      });
      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle: `Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.`,
        buttonTitle: "Muito obrigado",
        icon: "hug",
        nextScreen: "goBack",
      });
      DeviceEventEmitter.emit("@plantmanager:plant_save");
    } catch (e) {
      console.log(e);
      showMessage({
        message: "Não foi possível salvar. 😢",
        type: "danger",
      });
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
          pageData.data.frequency.repeat_every === "day" ? (
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
                onValue={(value) => {
                  setSelectedWeeks(value);
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

          {Platform.OS === "android" && (
            <Styled.DateTimePickerButton
              onPress={handleOpenDatetimePickerForAndroid}
            >
              <Styled.DateTimePickerText>
                {`Mudar ${format(selectedDateTime, "HH:mm")}`}
              </Styled.DateTimePickerText>
            </Styled.DateTimePickerButton>
          )}

          <TextButton text="Cadastrar Plantinha" onPress={handleSave} />
        </Styled.Controller>
      </Styled.Constainer>
    </ScrollView>
  );
}
