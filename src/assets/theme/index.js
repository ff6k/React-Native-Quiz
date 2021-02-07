import { DefaultTheme, configureFonts } from 'react-native-paper';
import {
  widthPercentageToDP as width,
  heightPercentageToDP as height,
} from 'react-native-responsive-screen';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'SegoeRegular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'SegoeBold',
    },
    italic: {
      fontFamily: 'SegoeItalic',
    },
    boldItalic: {
      fontFamily: 'SegoeBold',
      textTransform: 'italic',
    },
    medium: {
      fontFamily: 'SegoeMedium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'SegoeLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'SegoeLight',
      fontWeight: '200',
    },
  },
};

const colors = {
  ...DefaultTheme.colors,
  primary: 'rgba(22, 186, 95, 1)', // primary color for your app, usually your brand color.
  accent: 'rgba(132,21,132, 1)', // secondary color for your app which complements the primary color.
  background: 'rgba(255, 255, 255, 1)', // background color for pages, such as lists.
  surface: 'rgba(255, 255, 255, 1)', // background color for elements containing content, such as cards.
  text: 'rgba(0, 0, 0, 1)', // text color for content.
  disabled: 'rgba(22, 186, 95, 1)', // color for disabled elements.
  placeholder: 'rgba(22, 186, 95, 1)', // color for placeholder text, such as input placeholder.
  backdrop: 'rgba(0, 0, 0, .5)', // color for backdrops of various components such as modals.
  error: 'rgba(229, 0, 24, 1)',
  onSurface: null,
  onBackground: null,
  notification: null,
  blue: 'rgba(25, 118, 210, 1)',
  lightGray: 'rgba(221, 225, 227, 1)',
  lightPurple: 'rgba(177, 156, 217, 1)',
  lightGreen: 'rgba(22, 186, 95, 0.2)',
  lightRed: 'rgba(229, 0, 24, 0.1)',
};

export default {
  ...DefaultTheme,
  colors: {
    ...colors,
    withOpacity: (opacity = 1, colorName = '') => {
      const color = colors[colorName];
      return color.slice(0, color.lastIndexOf(',')).concat(`, ${opacity})`);
    },
  },
  fonts: configureFonts(fontConfig),
  roundness: 5,
  elevation: 4,
  spacing: {
    width: (percentile = 4) => width(percentile),
    height: (percentile = 4) => height(percentile),
  },
  mode: 'adaptive',
  dimensions: {
    width: (percentile = 100) => width(percentile),
    height: (percentile = 100) => height(percentile),
  },
};
