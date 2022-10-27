import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    wrongColor: string;
    rightColor: string;
    btnColor: string;
    textColor: string;
    grey: string;
    selectedColor: string;
    transparent: string;
  }
}
