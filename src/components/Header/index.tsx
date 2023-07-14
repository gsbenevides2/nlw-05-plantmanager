import React, { useEffect } from "react";
import { DeviceEventEmitter, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { RectButton } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import * as Styled from "./styles";

export function Header(): React.ReactElement {
  const [userName, setUserName] = React.useState<string>();
  const [image, setImage] = React.useState<string>();
  async function handleToChangeImageProfile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        const profile =
          (FileSystem.documentDirectory || "") +
          Date.now() +
          "profile." +
          result.name.split(".").pop();
        await FileSystem.copyAsync({
          from: result.uri,
          to: profile,
        });

        await AsyncStorage.setItem("@plantmanager:profile", profile);
        if (image) await FileSystem.deleteAsync(image);
        DeviceEventEmitter.emit("@plantmanager:profile", profile);
      } else {
        if (!image)
          showMessage({
            message: "Deixe-me ver como você é 😔",
            type: "danger",
          });
      }
    } catch (e) {

      showMessage({
        message: "Ocorreu um erro ao tentar alterar a imagem 😔",
        type: "danger",
      });
    }
  }
  React.useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");

      setUserName(user || "");
    }
    async function loadProfileImage() {
      AsyncStorage.getItem("@plantmanager:profile").then((img) =>
        setImage(img || undefined)
      );
    }
    loadStorageUserName();
    loadProfileImage();
  }, [userName]);
  React.useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "@plantmanager:profile",
      (newValue) => {
        setImage(newValue);
      }
    );
    return () => {
      subscription.remove();
    };
  }, [image]);
  return (
    <Styled.Container>
      <View>
        <Styled.Greeting>Olá,</Styled.Greeting>
        <Styled.Username>{userName}</Styled.Username>
      </View>
      {image ? (
        <RectButton onPress={handleToChangeImageProfile}>
          <Styled.Image source={{ uri: image }} />
        </RectButton>
      ) : (
        <RectButton onPress={handleToChangeImageProfile}>
          <Styled.Icon name="camera" />
        </RectButton>
      )}
    </Styled.Container>
  );
}
