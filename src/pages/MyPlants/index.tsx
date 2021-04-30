import React from 'react'
import { Alert, DeviceEventEmitter, FlatList } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { useNavigation } from '@react-navigation/native'

import nature from '../../assets/nature.png'
import waterdrop from '../../assets/waterdrop.png'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'
import {
  loadPlant,
  StoragePlantLoad,
  removePlant,
  distanceToNextRegation
} from '../../libs/storage'
import * as Styled from './styles'

interface Props {
  navigation: ReturnType<typeof useNavigation>
}

export function MyPlantsScreen({ navigation }: Props): React.ReactElement {
  const [myPlants, setMyPlants] = React.useState<StoragePlantLoad[]>([])
  const [loading, setLoading] = React.useState(true)
  const [empty, setEmpty] = React.useState(false)
  const [nextWatered, setNextWatered] = React.useState<string>()

  function handlePlantEdit(plant: StoragePlantLoad) {
    navigation.navigate('PlantSave', { pageData: plant })
  }

  function handleRemove(plant: StoragePlantLoad) {
    Alert.alert('Remover', `Deseja remover a ${plant.data.name}?`, [
      {
        text: 'Não 🙏🏻',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.data.id.toString())

            const newPlants = myPlants.filter(
              item => item.data.id !== plant.data.id
            )
            if (!newPlants.length) return setEmpty(true)
            const nextPlant = newPlants[0]
            const nextTime = distanceToNextRegation(
              nextPlant.data.frequency,
              nextPlant.dateTimeNotification,
              nextPlant.selectedWeeks
            )
            setNextWatered(
              `Regue sua ${newPlants[0].data.name} daqui a ${nextTime}`
            )

            setMyPlants(newPlants)
          } catch (error) {
            showMessage({
              message: 'Não foi possível remover! 😥',
              type: 'danger'
            })
          }
        }
      }
    ])
  }

  React.useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant()
      if (!plantsStoraged.length) return setEmpty(true)
      else setEmpty(false)
      const nextPlant = plantsStoraged[0]
      const nextTime = distanceToNextRegation(
        nextPlant.data.frequency,
        nextPlant.dateTimeNotification,
        nextPlant.selectedWeeks
      )
      setNextWatered(
        `Regue sua ${plantsStoraged[0].data.name} daqui a ${nextTime}`
      )
      setMyPlants(plantsStoraged)
      setLoading(false)
    }
    const subscription = DeviceEventEmitter.addListener(
      '@plantmanager:plant_save',
      () => {
        loadStorageData()
      }
    )
    loadStorageData()
    return () => {
      DeviceEventEmitter.removeSubscription(subscription)
    }
  }, [])

  if (empty) {
    return (
      <Styled.Container>
        <Header />
        <Styled.EmptyContainer>
          <Styled.EmptyImage
            source={nature}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Styled.EmptyTitle>
            Você ainda não me disse quais são suas plantínhas 😔
          </Styled.EmptyTitle>
          <Styled.EmptySubtitle>
            Vá em {'"+ Nova Planta"'} e me conte como elas são.
          </Styled.EmptySubtitle>
        </Styled.EmptyContainer>
      </Styled.Container>
    )
  }

  if (loading) {
    return <Load />
  }
  return (
    <Styled.Container>
      <Header />

      <Styled.Spotlight>
        <Styled.SpotlightImage source={waterdrop} />
        <Styled.SpotlightText>{nextWatered}</Styled.SpotlightText>
      </Styled.Spotlight>

      <Styled.Plants>
        <Styled.PlantsTitle>Próximas regadas</Styled.PlantsTitle>

        <FlatList
          data={myPlants}
          keyExtractor={item => item.data.id.toString()}
          renderItem={({ item }) => (
            <PlantCardSecondary
              onPress={() => handlePlantEdit(item)}
              handleRemove={() => handleRemove(item)}
              data={{
                name: item.data.name,
                photo: item.data.photo,
                hour: item.hour
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Styled.Plants>
    </Styled.Container>
  )
}
