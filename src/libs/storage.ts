/* eslint-disable camelcase */
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDays,
  format,
  formatDistanceToNow,
  getWeekOfMonth,
  isAfter,
  isBefore,
  set,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
// import { StorageAccessFramework } from 'expo-file-system'
import * as Notifications from "expo-notifications";

export type Week = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface PlantData {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: "week" | "day";
  };
}
export interface StoragePlantSave {
  data: PlantData;
  selectedWeeks: Week[];
  hour: number;
  minute: number;
}
export interface StoragePlant {
  [id: string]: {
    data: PlantData;
    notificationIds: string[];
    selectedWeeks: Week[];
    hour: number;
    minute: number;
  };
}
export interface StoragePlantLoad {
  data: PlantData;
  notificationIds: string[];
  selectedWeeks: Week[];
  hour: number;
  minute: number;
}
/*
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
*/

function calculateNextNotificationDate(
  frequency: {
    times: number;
    repeat_every: "week" | "day";
  },
  hour: number,
  minute: number,
  selectedWeeks: Week[]
): Date {
  if (frequency.repeat_every === "day") {
    const today = new Date();
    today.setHours(hour, minute);
    if (isBefore(today, new Date())) {
      return addDays(today, 1);
    }
    return today;
  }

  const nextDates = selectedWeeks
    .sort()
  .map((week) => {
    const today = new Date();
    const dateOfWeek = today.getDay() + 1;
    let offsets = week - dateOfWeek;
    if (offsets < 0) {
      offsets += 7 + offsets * -1;
    }
    const nextDate = addDays(today, offsets);
    nextDate.setHours(hour, minute);
    return nextDate;
  });

  const nextDay = nextDates.find((date) => date > new Date());
  if (nextDay) {
    return nextDay;
  }
  const firstDay = nextDates[0];
  return addDays(firstDay, 7);
}

async function scheduleNotifications(
  frequency: {
    times: number;
    repeat_every: "week" | "day";
  },
  hour: number,
  minute: number,
  selectedWeeks: Week[],
  plantName: string
): Promise<string[]> {
  const content = {
    title: "Heeey, 🌱",
    body: `Está na hora de cuidar da sua ${plantName}`,
    sound: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  };

  if (frequency.repeat_every === "day") {
    if (frequency.times === 1) {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
      return [notificationId];
    } else return [];
  } else {
    return await Promise.all(
      selectedWeeks.map(async (week) => {
        return await Notifications.scheduleNotificationAsync({
          content,
          trigger: {
            weekday: week,
            hour,
            minute,
            repeats: true,
          },
        });
      })
    );
  }
}

export async function savePlant(storageData: StoragePlantSave): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {};
    const oldPlant = oldPlants[storageData.data.id.toString()];
    if (oldPlant) {
      await Promise.all(
        oldPlant.notificationIds.map(
          Notifications.cancelScheduledNotificationAsync
        )
      );
    }
    const notificationIds = await scheduleNotifications(
      storageData.data.frequency,
      storageData.hour,
      storageData.minute,
      storageData.selectedWeeks,
      storageData.data.name
    );

    const newPlant: StoragePlant = {
      [storageData.data.id.toString()]: {
        ...storageData,
        notificationIds,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...oldPlants,
        ...newPlant,
      })
    );
  } catch (error) {
    console.log("Não foi possível salvar a planta", error);
    throw new Error("Não foi possível salvar a planta");
  }
}

// AsyncStorage.clear()

export async function loadPlant(): Promise<StoragePlantLoad[]> {
  try {
    const plantsJsonString = await AsyncStorage.getItem("@plantmanager:plants");
    const plantsObject = plantsJsonString
      ? (JSON.parse(plantsJsonString) as StoragePlant)
      : {};

    const plants = Object.keys(plantsObject).map((plant) => {
      const storageData = plantsObject[plant];
      return {
        ...storageData,
      };
    });

    return plants;
  } catch (error) {
    console.log("Não foi possível carregar as plantas", error);
    throw new Error("Não foi possível carregar as plantas");
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlant) : {};

  await Promise.all(
    plants[id].notificationIds.map(
      Notifications.cancelScheduledNotificationAsync
    )
  );
  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}

export async function loadSortedPlantsByNextDate(): Promise<
  StoragePlantLoad[]
> {
  const plants = await loadPlant();
  const plantsWithNextDate = plants.map((plant) => {
    const nextDate = calculateNextNotificationDate(
      plant.data.frequency,
      plant.hour,
      plant.minute,
      plant.selectedWeeks
    );
    return {
      ...plant,
      nextDate,
    };
  });
/*
  plantsWithNextDate.map((plant) =>
    console.log({
      date: format(plant.nextDate, "dd/MM/yyyy HH:mm"),
      name: plant.data.name,
      hours: plant.hour,
      minutes: plant.minute,
      weeks: plant.selectedWeeks,
    })
  );
*/
  const sortedPlants = plantsWithNextDate
    .sort((a, b) => {
      return isAfter(a.nextDate, b.nextDate) ? 1 : -1;
    })
    .map((plant) => {
      return {
        ...plant,
        nextDate: undefined,
      };
    });
  return sortedPlants;
}

export function getFormatedDateToNextRegation(
  frequency: {
    times: number;
    repeat_every: "week" | "day";
  },
  hour: number,
  minute: number,
  selectedWeeks: Week[]
): string {
  const date = calculateNextNotificationDate(
    frequency,
    hour,
    minute,
    selectedWeeks
  );
  return formatDistanceToNow(date, {
    locale: ptBR,
  });
}
