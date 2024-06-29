import {
  createGlobalThemeContract,
  createGlobalTheme,
  createThemeContract,
  createTheme
} from "@vanilla-extract/css";

const root = createGlobalThemeContract({});

createGlobalTheme(":root", {});

const colors = createThemeContract({});

const lightTheme = createTheme(colors, {});

const darkTheme = createTheme(colors, {});

export const vars = { ...root, colors };

export { lightTheme, darkTheme };
