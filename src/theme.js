import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      // oranje
      main: 'rgb(241, 108, 33)',
    },
    secondary: {
      // donkerblauw
      main: 'rgb(0, 56, 89)',
    },
  },
  // typography: {
  //   h2: {
  //     fontFamily: 'Arial',
  //   },
  // },
  // props: {
  //   MuiTypography: {
  //     variantMapping: {
  //       h1: 'h2',
  //       h2: 'h2',
  //       h3: 'h2',
  //       h4: 'h2',
  //       h5: 'h2',
  //       h6: 'h2',
  //       subtitle1: 'h2',
  //       subtitle2: 'h2',
  //       body1: 'span',
  //       body2: 'span',
  //     },
  //   },
  // },
})

export default theme
