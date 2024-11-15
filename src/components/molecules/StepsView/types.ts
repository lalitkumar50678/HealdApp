
export type StepsViewProps ={
    isPlaying: boolean;
    stepsCount: number;
    targetStepsCount: number;
    onStartStop:(isPlaying: boolean) =>void;
}