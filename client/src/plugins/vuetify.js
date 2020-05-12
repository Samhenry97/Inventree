import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green,
        secondary: colors.indigo
      },
      dark: {
        primary: colors.green,
        secondary: colors.indigo
      }
    }
  }
});
