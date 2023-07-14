/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { EnvironmentButton } from "../../components/EnvironmentButton";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";
import { PlantData } from "../../libs/storage";
import api from "../../services/api";
import { theme } from "../../theme";
import * as Styled from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { StackScreensProps, TabsParams } from "../../routes/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

interface EnvironmentProps {
  key: string;
  title: string;
}
type Props = BottomTabScreenProps<TabsParams, "Nova Planta">;

export function PlantSelectScreen({ navigation }: Props): React.ReactElement {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantData[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handlePlantSelect(plant: PlantData) {
    navigation.navigate("PlantSave", { pageData: { data: plant } });
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get<PlantData[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    const plants:PlantData[] = data.map((plant) => ({
      ...plant,
      photo:`http://google.gui.dev.br:3001/${plant.photo}`
    }));

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...plants]);
      setFilteredPlants((oldValue) => [...oldValue, ...plants]);
    } else {
      setPlants(plants);
      setFilteredPlants(plants);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <Styled.Container>
      <Styled.HeaderContainer>
        <Header />

        <Styled.Title>Em qual ambiente</Styled.Title>
        <Styled.Subtitle>você quer colocar sua planta?</Styled.Subtitle>
      </Styled.HeaderContainer>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={Styled.EnviromentList}
          ListHeaderComponent={<View />}
          ListHeaderComponentStyle={{ marginRight: 32 }}
        />
      </View>

      <Styled.Plants>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={theme.colors.green} />
            ) : (
              <></>
            )
          }
        />
      </Styled.Plants>
    </Styled.Container>
  );
}
