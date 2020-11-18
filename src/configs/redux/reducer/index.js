let initialState = {
    user_id: null,
    comments: [],
    favorites: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_USER_ID":
            return {
                ...state,
                user_id: action.value
            }
        case "ADD_COMMENT":
            let add_comment = state.comments
            add_comment.push(action.value)
            return {
                ...state,
                comments: add_comment
            }
        case "ADD_FAVORITE":
            let add_favorite = state.favorites
            let data = state.favorites.filter(favorite => favorite.id === action.value.id)
            if (data.length === 0) {
                add_favorite.push(action.value)
            }
            return {
                ...state,
                favorites: add_favorite
            }

        default:
            return state
    }
}

export default reducer