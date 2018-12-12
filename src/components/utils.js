import { Dimensions, AsyncStorage } from 'react-native';
export const padding = 10;


export const setStorage = (key, value) => {
    console.log('calling set storage: ' + key + ' = ' + value);
    AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
      if (error) {
        console.log('error')
      }
    });
}


export const scaledSize = (size) => {
    // Use iPhone6 as base size which is 375 x 667
    const { width, height } = Dimensions.get('window');
    let baseWidth;
    let baseHeight;

    if (height >= width) {
        baseWidth = 375;
        baseHeight = 667;
    } else {
        baseWidth = 667;
        baseHeight = 375;
    }

    const scaleWidth = width / baseWidth;
    const scaleHeight = height / baseHeight;
    const scale = Math.min(scaleWidth, scaleHeight);
    return Math.ceil((size * scale));
}

/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
const msp = (dim, limit) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};
 

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};
 
/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
 
/**
 * Returns true if the device is a tablet
 */
export const isTablet = () => {
    const dim = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};
 
/**
 * Returns true if the device is a phone
 */
export const isPhone = () => { return !isTablet(); }
 
