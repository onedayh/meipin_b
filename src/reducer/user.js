import {LOGIN, LOGOUT, CHANGE_USERINFO, CHANGE_TOKEN, CREATE_SHOP} from "../action/user";

const initialState = {
    token: null,
    userInfo: null,
    merchant_id: null,
    shop_id: 46
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const {token, user, merchant_id} = action.loginInfo;
            return {
                ...state,
                token,
                userInfo: user,
                merchant_id
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
                userInfo: null,
                merchant_id: null
            }
        case CHANGE_USERINFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    [action.key]: action.value
                }
            }
        case CHANGE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case CREATE_SHOP:
            return {
                ...state,
                merchant_id: action.merchant_id,
                shop_id: action.shop_id
            }
        default:
            return state
    }
}

export default users;