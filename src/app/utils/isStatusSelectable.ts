import { selectableStatus } from './../staticContents.json'

export const isStatusSelectable = (currentStatus: string) => {
    return selectableStatus.find((statusFromArray: string) => statusFromArray === currentStatus) ? true : false
};