import { PaletteMode } from '@mui/material'

const getDesignTokens = (mode: PaletteMode) => ({
    spacing: 4,
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    paddingRight: 4,
                    borderRadius: 16,
                    '& fieldset': {
                        border: 'none',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
    palette: {
        mode,
        primary: {
            light: '#ffff52',
            main: '#ffd600',
            dark: '#c7a500',
        },
        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  background: {
                      paper: '#eeeeee',
                  },
                  secondary: {
                      light: '#b2fef7',
                      main: '#80cbc4',
                      dark: '#4f9a94',
                  },
              }
            : {
                  // palette values for dark mode
                  background: {
                      default: '#0F0F0F',
                      paper: '#212121',
                  },
                  secondary: {
                      light: '#428e92',
                      main: '#006064',
                      dark: '#00363a',
                  },
              }),
    },
})

export default getDesignTokens
