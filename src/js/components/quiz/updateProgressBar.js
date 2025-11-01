export default function updateProgressBar(elements, state, maxSteps) {
  const { progressFill, counterElement } = elements;
  
  // Check if elements exist before accessing properties
  if (!progressFill) {
    console.error("Progress Fill element is missing.");
    return;
  }
  if (!counterElement) {
    console.error("Progress counter element is missing.");
    return;
  }

  // Update the progress bar's width
  progressFill.style.width = (state.currentStep / maxSteps) * 100 + "%";
  // Update the counter (e.g., "Step: 1/5")
  counterElement.textContent = `Крок: ${state.currentStep}/${maxSteps}`;
}