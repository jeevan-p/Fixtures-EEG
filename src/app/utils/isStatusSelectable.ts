import { selectableStatus } from './../staticContents.json'

// Function to check whether the fixtures can be selectible or disabled based on the status passed
export const isStatusSelectable = (currentStatus: string) => {
    return selectableStatus.find((statusFromArray: string) => statusFromArray === currentStatus) ? true : false
};