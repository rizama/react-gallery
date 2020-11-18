export const actionSaveUserId = (data) => {
    return {
        type: "SAVE_USER_ID",
        value: data
    }
}

export const actionAddComment = (data) => {
    return {
        type: "ADD_COMMENT",
        value: data
    }
}

export const actionAddFavorite = (data) => {
    return {
        type: "ADD_FAVORITE",
        value: data
    }
}