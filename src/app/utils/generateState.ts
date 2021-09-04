export const generateState = (currentState: StateItem, wsData: Item) => {
    let newState = Object.assign(currentState);
    if(currentState.length === 0) {
        console.log('+ empty');
        return currentState;
    }

    let find = currentState.find((list) => {
        if(list.id === wsData.id) {
            return true;
        }
    });
    console.log('+', find);
    
    return newState;
};

interface Item {
    id: string,
    name: string,
    startTime: string,
    markets: {
        id: string,
        name: string,
        status: string,
        selections: {
            id: string,
            name: string,
            price: number
        }[]
    }[]
}

type StateItem = Item[];