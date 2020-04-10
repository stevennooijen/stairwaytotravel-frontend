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
    // for divider lines like on the nav bar and footer
    divider: '#e8e8e8',
  },
  typography: {
    h2: {
      fontSize: 48,
      // secondary
      color: 'rgb(0, 56, 89)',
    },
    h3: {
      fontSize: 32,
      fontWeight: 100,
    },
    h4: {
      fontSize: 32,
      fontWeight: 100,
    },
    h6: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
})

export default theme
