import type {PropsWithChildren} from 'react';

export type CircularProgressBarProps = {
    size?:number,
    width?:number,
    fill?: number,
    tintColor?: string
    onAnimationCompleted?: ()=> void;
    backgroundColor?: string;
    arcSweepAngle?: number;
    rotation?: number;
} & PropsWithChildren;