import {HANDLE_SIDE_NAV} from '../action/nav';

const initialState = {
    curSelectKey: ['/m1'],
    curOpenKey: []
}

const nav = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_SIDE_NAV:
            return {
                ...state,
                curSelectKey: action.selectKey,
                curOpenKey: action.openKey,

            }
        default:
            return state
    }
}

export default nav