export function setupEventListeners(elements, state, maxSteps, handlers) {
  const { nextButtons, prevButtons, submitFormButtons, radioButtons } = elements;

  nextButtons.forEach(btn =>
    btn.addEventListener("click", e => handlers.handleNextClick(e, elements, state, maxSteps))
  );

  prevButtons.forEach(btn =>
    btn.addEventListener("click", e => handlers.handlePrevClick(e, elements, state, maxSteps))
  );

  submitFormButtons.forEach(btn =>
    btn.addEventListener("click", e => handlers.handleSubmitClick(e, elements, state, maxSteps))
  );

  radioButtons.forEach(radio => {
    radio.addEventListener("click", () => {
      radio.checked = true;
      const isCustom = radio.closest(".quiz__option--custom");
      if (isCustom) return;
      setTimeout(() => handlers.handleNextClick(null, elements, state, maxSteps), 550);
    });
  });
}