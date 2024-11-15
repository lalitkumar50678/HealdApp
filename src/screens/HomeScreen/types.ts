import HomeScreen from "./HomeScreen";

export type HomeScreenViewProps = {
    steps: number;
    isPlaying: boolean;
    onStartStop:(isPlaying: boolean) =>void;
    distanceTravel: number;
    fill: number;
    list: Array<LocalStarage>;
}

export type Location = {
    latitude: number;
    longitude: number;
  };

export type LocalStarage = {
    distanceTravel: number;
    stepsCount: number;
    lastLocation?: Location;
    calories: number;
    time: string;
    date: string;
}

export type LocalDataWithTime = Record<string,LocalStarage>;
export type LocalDataWithDate = Record<string, LocalDataWithTime>