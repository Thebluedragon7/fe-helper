import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "@/App.tsx";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render the form", () => {
    expect(document.querySelector("form")).not.toBeNull();
  });

  it("should render the input fields", () => {
    expect(document.querySelectorAll("input")).toHaveLength(4);
  });

  it("should render the submit button", () => {
    const button = document.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.textContent).toBe("Submit");
  });

  it("should render error text on each field when empty form is submitted click submit button", async () => {
    const button = document.querySelector("button");

    button?.click();

    await waitFor(() => {
      expect(document.querySelectorAll("span")).toHaveLength(4);
    });
  });

  it("should display 'Expected number, received nan' error for each non-nullable input field when empty string is submitted", async () => {
    const submitButton = document.querySelector("button") as HTMLButtonElement;

    submitButton.click();

    await waitFor(() => {
      const errorSpans = document.querySelectorAll("span");
      expect(errorSpans).toHaveLength(4);
      errorSpans.forEach((span) => {
        expect(span.textContent).toBe("Expected number, received nan");
      });
    });
  });

  it("should display 'Min view must be less than max view' error when minView is greater than maxView", async () => {
    render(<App />);

    const minView = document.querySelector(
      'input[name="minView"]'
    ) as HTMLInputElement;
    const maxView = document.querySelector(
      'input[name="maxView"]'
    ) as HTMLInputElement;
    const minSize = document.querySelector(
      'input[name="minSize"]'
    ) as HTMLInputElement;
    const maxSize = document.querySelector(
      'input[name="maxSize"]'
    ) as HTMLInputElement;
    const submitButton = document.querySelector("button") as HTMLButtonElement;

    fireEvent.change(minView, { target: { value: "200" } });
    fireEvent.change(maxView, { target: { value: "100" } });
    fireEvent.change(minSize, { target: { value: "20" } });
    fireEvent.change(maxSize, { target: { value: "30" } });

    submitButton.click();

    await waitFor(() => {
      const errorSpan = document.querySelector("span");
      expect(errorSpan).not.toBeNull();
      expect(errorSpan?.textContent).toBe(
        "Min view must be less than max view"
      );
    });
  });

  it("should display 'Min size must be less than max size' error when minSize is greater than maxSize", async () => {
    const minView = document.querySelector(
      'input[name="minView"]'
    ) as HTMLInputElement;
    const maxView = document.querySelector(
      'input[name="maxView"]'
    ) as HTMLInputElement;
    const minSize = document.querySelector(
      'input[name="minSize"]'
    ) as HTMLInputElement;
    const maxSize = document.querySelector(
      'input[name="maxSize"]'
    ) as HTMLInputElement;
    const submitButton = document.querySelector("button") as HTMLButtonElement;

    fireEvent.change(minView, { target: { value: "100" } });
    fireEvent.change(maxView, { target: { value: "200" } });
    fireEvent.change(minSize, { target: { value: "30" } });
    fireEvent.change(maxSize, { target: { value: "20" } });

    submitButton.click();

    await waitFor(() => {
      const errorSpan = document.querySelector("span");
      expect(errorSpan).not.toBeNull();
      expect(errorSpan?.textContent).toBe(
        "Min size must be less than max size"
      );
    });
  });

  it("should calculate the clamp value", async () => {
    const minView = document.querySelector(
      'input[name="minView"]'
    ) as HTMLInputElement;
    const maxView = document.querySelector(
      'input[name="maxView"]'
    ) as HTMLInputElement;
    const minSize = document.querySelector(
      'input[name="minSize"]'
    ) as HTMLInputElement;
    const maxSize = document.querySelector(
      'input[name="maxSize"]'
    ) as HTMLInputElement;
    const submitButton = document.querySelector("button") as HTMLButtonElement;

    fireEvent.change(minView, { target: { value: "0" } });
    fireEvent.change(maxView, { target: { value: "100" } });
    fireEvent.change(minSize, { target: { value: "10" } });
    fireEvent.change(maxSize, { target: { value: "20" } });

    submitButton.click();

    await waitFor(() => {
      return expect(document.querySelector("code")?.textContent).toBe(
        "clamp(10px, 10vw + 10px, 20px)"
      );
    });
  });
});
