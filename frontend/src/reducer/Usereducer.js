export const initialState = {
    isStateTrue: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TRUE":
            return {...state, isStateTrue: true }
        case "SET_FALSE":
            return {...state, isStateTrue: false }

        default:
            return state
    }

}