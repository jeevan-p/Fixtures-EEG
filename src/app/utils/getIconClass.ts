import { statusToIconClass } from './../staticContents.json';

export const getIconClass = (currentStatus: string) => {
    const classLabel = statusToIconClass.find(list => list.status === currentStatus);
    return classLabel ? classLabel.className : '';
};