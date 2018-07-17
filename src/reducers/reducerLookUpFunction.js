const reducerLookUpfunction = (initialState, fnLookUp) => {
    return (state = initialState, {type, payload}) => {
        const handler = fnLookUp[type];
        return handler ? handler(state, payload): state
    }
}

export default reducerLookUpfunction;