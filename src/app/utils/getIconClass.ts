import { statusToIconClass } from './../staticContents.json';

// Get icon class name based on status passed
export const getIconClass = (currentStatus: string) => {
    const classLabel = statusToIconClass.find(list => list.status === currentStatus);
    return classLabel ? classLabel.className : '';
};