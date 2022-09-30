import '@mui/material/Button'
// 參考： https://stackoverflow.com/questions/70451008/mui-override-slider-color-options-with-module-augmentation
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true
  }
}
