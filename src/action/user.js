export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_USERINFO = 'CHANGE_USERINFO';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const CREATE_SHOP = 'CREATE_SHOP';

export const logIn = loginInfo => {
    return {
        type: LOGIN,
        loginInfo
    }
}

export const logOut = () => {
    return {
        type: LOGOUT
    }
}

export const changeUserInfo = (key, value) => {
    return {
        type: CHANGE_USERINFO,
        key,
        value
    }
}

export const changeToken = token => {
    return {
        type: CHANGE_TOKEN,
        token
    }
}

export const createShop = (merchant_id, shop_id) => {
    return {
        type: CREATE_SHOP,
        merchant_id,
        shop_id
    }
}