import { statusToIconClass } from './../staticContents.json';

export const getIconClass = (currentStatus: string) => {
    return statusToIconClass.find(list => list.status === currentStatus)?.className;
};