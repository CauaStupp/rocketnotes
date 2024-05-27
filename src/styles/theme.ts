import { DefaultTheme } from "styled-components";

interface Colors {
  BACKGROUND_900: string;
  BACKGROUND_800: string;
  BACKGROUND_700: string;

  WHITE: string;
  ORANGE: string;

  GRAY_100: string;
  GRAY_300: string;

  RED: string;
}

export interface Theme extends DefaultTheme {
  COLORS: Colors;
}

export const myTheme: Theme = {
  COLORS: {
    BACKGROUND_900: "#232129",
    BACKGROUND_800: "#312E38",
    BACKGROUND_700: "#3E3B47",

    WHITE: "#F4EDE8",
    ORANGE: "#FF9000",

    GRAY_100: "#999591",
    GRAY_300: "#666360",

    RED: "#FF002E",
  },
};
