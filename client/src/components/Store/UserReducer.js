export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                logged: true
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                active: true,
                logged: true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                active: false,
                logged: false
            }
        case 'activate':
            return {
                ...state,
                active: true,
            }
        case 'editTeamName':
            return {
                ...state,
                user: {
                    ...state.user, myTeams: state.user.myTeams.map((member) => {
                        if (action.payload.id === member.team.id) {
                            member.team.name = action.payload.name
                        }
                        return member;
                    })
                }
            }
        case 'editTeamLogo':
            return {
                ...state,
                user: {
                    ...state.user, myTeams: state.user.myTeams.map((member) => {
                        if (action.payload.id === member.team.id) {
                            member.team.logo = action.payload.logo
                        }
                        return member;
                    })
                }
            }
        case 'addPost':
            return {
                ...state,
                posts: ([...state.posts, ...action.payload.post]).sort((a,b) => {
                    return b.postTime - a.postTime;
                } )
                ,
            }
                ;
        case 'deleteTeamPosts':
            return {
                ...state,
                posts: state.posts.filter( (post) => {
                    return post.teamId !== action.payload.teamId;
                } )
            }
                ;
        default:
            return state;
    }
};

export const initialUserState = {
    active: false,
    user: null,
    logged: false,
    posts: []
}
