import { PURCHASED_FULL_VERSION } from './types';

export const setHasPurchaseFullVersion = () => {
    return {
        type: PURCHASED_FULL_VERSION,
        payload: true
    };
};