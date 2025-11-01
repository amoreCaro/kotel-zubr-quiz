export default function updateButtonsState(elements, state, maxSteps) {
  const { prevButtons, nextButtons, submitFormButtons, quizBottom, successFieldset } = elements;

  // Ensure buttons exist before trying to modify them
  if (!prevButtons ) {
    console.error("prev buttons are missing.");
    return;
  }
    if ( !nextButtons ) {
    console.error("next button are missing.");
    return;
  }
    if (!submitFormButtons) {
    console.error("submit button are missing.");
    return;
  }

  // Disable the "Prev" buttons on the first step
  prevButtons.forEach(btn => {
    btn.disabled = state.currentStep === 1;
    btn.classList.toggle("disabled", state.currentStep === 1);
  });

  // Hide "Next" buttons on the last step
  nextButtons.forEach(btn => btn.classList.toggle("hidden", state.currentStep >= maxSteps));
  
  // Show the "Submit" button on the last step
  submitFormButtons.forEach(btn => btn.classList.toggle("hidden", state.currentStep !== maxSteps));

  // Disable quiz bottom if successFieldset is active
  if (quizBottom) {
    quizBottom.classList.toggle("disabled", successFieldset.classList.contains("active"));
  }
}