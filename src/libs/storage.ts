/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  addDays,
  format,
  formatDistanceToNow,
  getWeekOfMonth,
  isAfter,
  set
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { StorageAccessFramework } from 'expo-file-system'
import * as Notifications from 'expo-notifications'

export type Week = 1 | 2 | 3 | 4 | 5 | 6 | 7
export interface PlantData {
  id: number
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: 'week' | 'day'
  }
}
export interface StoragePlantSave {
  data: PlantData
  selectedWeeks: Week[]
  dateTimeNotification: Date
}
export interface StoragePlant {
  [id: string]: {
    data: PlantData
    notificationIds: string[]
    selectedWeeks: Week[]
    dateTimeNotification: Date
    hour: string
  }
}
export interface StoragePlantLoad {
  data: PlantData
  notificationIds: string[]
  selectedWeeks: Week[]
  dateTimeNotification: Date
  hour: string
}

export function distanceToNextRegation(
  frequency: {
    times: number
    repeat_every: 'week' | 'day'
  },
  dateTimeNotification: Date,
  selectedWeeks: Week[]
): string | undefined {
  if (frequency.repeat_every === 'day') {
    if (frequency.times === 1) {
      const today = new Date()
      const dateInToday = set(dateTimeNotification, {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
      })
      if (isAfter(dateInToday, today)) {
        return formatDistanceToNow(dateInToday, {
          locale: ptBR
        })
      } else {
        return formatDistanceToNow(addDays(dateInToday, 1), {
          locale: ptBR
        })
      }
    }
  } else {
    const dateOfWeek = getWeekOfMonth(new Date())
    const ordenedWeeks = selectedWeeks.sort()
    const nextWeekDay = ordenedWeeks.find(week => week - 1 >= dateOfWeek)
    if (nextWeekDay) {
      return formatDistanceToNow(
        addDays(new Date(), nextWeekDay - dateOfWeek),
        {
          locale: ptBR
        }
      )
    } else {
      const firstDay = ordenedWeeks[0]
      return formatDistanceToNow(
        addDays(new Date(), 7 - dateOfWeek + firstDay),
        {
          locale: ptBR
        }
      )
    }
  }
}

async function scheduleNotifications(
  frequency: {
    times: number
    repeat_every: 'week' | 'day'
  },
  dateTimeNotification: Date,
  selectedWeeks: Week[],
  plantName: string
): Promise<string[]> {
  const content = {
    title: 'Heeey, 🌱',
    body: `Está na hora de cuidar da sua ${plantName}`,
    sound: true,
    priority: Notifications.AndroidNotificationPriority.HIGH
  }
  const hour = dateTimeNotification.getHours()
  const minute = dateTimeNotification.getMinutes()
  if (frequency.repeat_every === 'day') {
    if (frequency.times === 1) {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          hour,
          minute,
          repeats: true
        }
      })
      return [notificationId]
    } else return []
  } else {
    return await Promise.all(
      selectedWeeks.map(async week => {
        return await Notifications.scheduleNotificationAsync({
          content,
          trigger: {
            weekday: week,
            hour,
            minute,
            repeats: true
          }
        })
      })
    )
  }
}

export async function savePlant(storageData: StoragePlantSave): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {}
    const oldPlant = oldPlants[storageData.data.id.toString()]
    if (oldPlant) {
      await Promise.all(
        oldPlant.notificationIds.map(
          Notifications.cancelScheduledNotificationAsync
        )
      )
    }
    const notificationIds = await scheduleNotifications(
      storageData.data.frequency,
      storageData.dateTimeNotification,
      storageData.selectedWeeks,
      storageData.data.name
    )

    const newPlant: StoragePlant = {
      [storageData.data.id.toString()]: {
        ...storageData,
        notificationIds,
        hour: format(storageData.dateTimeNotification, 'HH:mm')
      }
    }

    await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({
        ...oldPlants,
        ...newPlant
      })
    )
  } catch (error) {
    throw new Error(error)
  }
}

// AsyncStorage.clear()

export async function loadPlant(): Promise<StoragePlantLoad[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlant) : {}

    const plantsSorted = Object.keys(plants)
      .map(plant => {
        const storageData = plants[plant]
        return {
          ...storageData,
          dateTimeNotification: new Date(storageData.dateTimeNotification)
        }
      })
      .sort((a, b) =>
        Math.floor(
          a.dateTimeNotification.getTime() / 1000 -
            Math.floor(b.dateTimeNotification.getTime() / 1000)
        )
      )

    return plantsSorted
  } catch (error) {
    throw new Error(error)
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants')
  const plants = data ? (JSON.parse(data) as StoragePlant) : {}

  await Promise.all(
    plants[id].notificationIds.map(
      Notifications.cancelScheduledNotificationAsync
    )
  )
  delete plants[id]

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
}
