export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                active: true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                active: false
            }
        case 'activate':
            return {
                ...state,
                active: true
            }
                ;
        default:
            return state;
    }
};

export const initialUserState = {
    active: false,
    user: null
}
