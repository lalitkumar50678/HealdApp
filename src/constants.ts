import { Colors } from "./utils";

export const TOTAL_TARGET_STEPS  = 2000;
export const DATE_FORMAT = 'DD-MM-yyyy';
export const TIME_FORMAT = 'HH:00';
export const BACKGROUND_TASK_OPTIONS = {
    taskName: 'Heald Task',
    taskTitle: 'Heald title',
    taskDesc: 'Background steps count',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: Colors.CIRCULAR_FILL,
    linkingURI: 'yourSchemeHere://heald/all', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};