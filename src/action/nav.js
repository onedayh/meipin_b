export const HANDLE_SIDE_NAV = 'CHANGE_SIDE_NAV';
export const HANDLE_TAB_NAV = 'HANDLE_TAB_NAV';

export const changeSideNav = (selectKey, openKey) => {
    return {
        type: HANDLE_SIDE_NAV,
        selectKey,
        openKey
    }
}