export default function setupCustomOptionToggle() {
  // Get the custom option element
  const customOption = document.querySelector(".quiz__option.quiz__option--custom");
  if (!customOption) return; // Exit if it doesn't exist

  // Get the input inside the custom option
  const inputField = customOption.querySelector(".quiz__option-input");

  // Get the "Next" button
  const nextButton = document.querySelector(".quiz__button--next");

  // === Click on the custom option ===
  // Add 'active' class and focus the input
  customOption.addEventListener("click", () => {
    customOption.classList.add("active");
    inputField.focus();
  });

  // === Input text event ===
  // Add or remove 'has-value' class depending on whether input has text
  inputField.addEventListener("input", () => {
    customOption.classList.toggle("has-value", inputField.value.trim() !== "");
  });

  // === Click outside the custom input ===
  // If click is outside the custom input and not on the Next button
  document.addEventListener("click", (event) => {
    const isNextButton = nextButton && nextButton.contains(event.target);

    if (!customOption.contains(event.target) && !isNextButton) {
      // Toggle 'show-text', 'active', and 'has-value' classes depending on input value
      customOption.classList.toggle("show-text", inputField.value.trim() !== "");
      customOption.classList.toggle("active", inputField.value.trim() !== "");
      customOption.classList.toggle("has-value", inputField.value.trim() !== "");
    } else if (customOption.contains(event.target)) {
      // Remove 'show-text' if clicking inside the custom option
      customOption.classList.remove("show-text");
    }
  });

  // === Initial input state ===
  // If input already has value, add 'active' and 'has-value' classes
  if (inputField.value.trim() !== "") {
    customOption.classList.add("active", "has-value");
  }

  // === Click on the Next button ===
  // Add 'has-value' class if input has text
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (inputField.value.trim() !== "") {
        customOption.classList.add("has-value");
      }
    });
  }
}