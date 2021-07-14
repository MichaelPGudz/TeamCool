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
        case 'editTeamName':
             return {...state,
             user: {...state.user, myTeams: state.user.myTeams.map( (member) => {
                if (action.payload.id === member.team.id){
                    member.team.name = action.payload.name
                }
                return member;
             })}}
        case 'editTeamLogo':
            return {...state,
                user: {...state.user, myTeams: state.user.myTeams.map( (member) => {
                        if (action.payload.id === member.team.id){
                            member.team.logo = action.payload.logo
                        }
                        return member;
                    })}}
                ;
        default:
            return state;
    }
};

export const initialUserState = {
    active: false,
    user: null
}
