import React from "react";
import { TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import { showMessage } from "react-native-flash-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { TextButton } from "../../components/TextButton";
import * as Styled from "./styles";
import { StackScreensProps } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<StackScreensProps, "UserIdentification">;

export function UserIdentificationScreen({
  navigation,
}: Props): React.ReactElement {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);
  const [name, setName] = React.useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      return showMessage({
        message: "Me diz como chamar você 😢",
        type: "danger",
      });
    }
    try {
      await AsyncStorage.setItem("@plantmanager:user", name);
      navigation.navigate("Confirmation", {
        title: "Prontinho",
        subtitle:
          "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "goToApp",
      });
    } catch (_e) {
      showMessage({
        message: "Não foi possível salvar o seu nome. 😢",
        type: "danger",
      });
    }
  }
  return (
    <Styled.ContainerSafeArea>
      <Styled.ContainerKeyboard
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Styled.Content>
            <Styled.Form>
              <Styled.Header>
                <Styled.Emoji>{isFilled ? "😄" : "😀"}</Styled.Emoji>
                <Styled.Title>
                  Como podemos {"\n"}
                  chamar você?
                </Styled.Title>
              </Styled.Header>
              <Styled.Input
                isActive={isFocused || isFilled}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <Styled.Footer>
                <TextButton text="Confimar" onPress={handleSubmit} />
              </Styled.Footer>
            </Styled.Form>
          </Styled.Content>
        </TouchableWithoutFeedback>
      </Styled.ContainerKeyboard>
    </Styled.ContainerSafeArea>
  );
}
