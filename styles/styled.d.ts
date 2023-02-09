import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      bgMain: string;
      bgOffset: string;
      textMain: string;
      textOffset: string;
    };
  }
}
