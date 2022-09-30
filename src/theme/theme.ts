import { createTheme } from '@mui/material/styles'
import palette from './palette'
// import '@mui/material/styles/createPalette'
// import { PaletteColor, PaletteColorOptions } from '@mui/material/styles/createPalette'
// declare module '@mui/material/styles/createPalette' {
//   interface Palette {
//     green: PaletteColor
//   }
//   interface PaletteOptions {
//     green?: PaletteColorOptions
//   }
// }
const theme = createTheme({
  palette,
})

export default theme
