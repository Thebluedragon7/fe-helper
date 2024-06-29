import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box"
});

globalStyle("html", {
  fontSize: "16px",
  fontFamily: "Arial, sans-serif"
});

globalStyle("html, body, #root", {
  height: "100%"
});
