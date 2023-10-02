import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const COLORS = {
  primaryRed: '#CF0A0A',
  secondaryWhite: '#EEEEEE',
  black: '#000000',
};
export const SIZES = {
  // font sizes
  largerTitles: 36,
  title: 26,
  h1: 24,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14.5,
  body1: 30,
  body2: 20,
  body3: 14,
  body4: 14,
  body5: 12,

  // global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largerTitles: { fontFamily: 'PoppinBold', fontSize: SIZES.largerTitles },
  title: { fontFamily: 'PoppinBold', fontSize: SIZES.title },
  h6: { fontFamily: 'HeeboRegular', fontSize: SIZES.h6 },
  h5: { fontFamily: 'HeeboRegular', fontSize: SIZES.h5 },
  h4: { fontFamily: 'HeeboRegular', fontSize: SIZES.h4 },
  h3: { fontFamily: 'HeeboRegular', fontSize: SIZES.h3 },
  h2: { fontFamily: 'HeeboRegular', fontSize: SIZES.h2 },
  h1: { fontFamily: 'HeeboRegular', fontSize: SIZES.h1 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
