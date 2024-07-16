import { style } from "@vanilla-extract/css";

const codeBlock = style({
  position: "relative",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  width: "500px",
  overflowX: "scroll",
  padding: "1.25rem",
  border: "1px solid #ddd"
});

const codeBlockCode = style({
  fontSize: "0.875rem",
  fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace"
});

const copyCodeBtn = style({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  border: "none",
  padding: "0.25rem 0.5rem",
  backgroundColor: "#222",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
  fontSize: "0.75rem",

  selectors: {
    [`${codeBlock}:hover &`]: {
      opacity: 1,
      visibility: "visible"
    }
  }
});

export { codeBlock, codeBlockCode, copyCodeBtn };
