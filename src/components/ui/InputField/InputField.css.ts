import { style } from "@vanilla-extract/css";

const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.375rem",

  selectors: {
    "&:not(:last-child)": {
      marginBottom: "1rem"
    }
  }
});

const inputLabel = style({});

const inputField = style({
  padding: "0.5rem 0.75rem",
  border: "1px solid #ccc",
  borderRadius: "0.25rem"
});

const inputGroupError = style({
  fontSize: "0.75rem"
});

export { inputGroup, inputLabel, inputField, inputGroupError };
