import updateButtonsState from "./updateButtonsState.js";
import updateProgressBar from "./updateProgressBar.js";

import updateGiftRadioSelection from "./updateGiftRadioSelection.js";
import { handleNextClick, handlePrevClick, handleSubmitClick } from "./steps.js";
import { setupEventListeners } from "./events.js";
import { validateName, validatePhone } from "./validators.js"; 

export default function progressbar() {
  // ==========================
  // DOM elements
  // ==========================
  const progressFill = document.querySelector(".quiz__progressbar-fill");
  const counterElement = document.querySelector(".quiz__stepcounter span");
  const nextButtons = document.querySelectorAll(".quiz__button--next");
  const prevButtons = document.querySelectorAll(".quiz__button--prev");
  const submitFormButtons = document.querySelectorAll(".quiz__button--submit");
  const radioButtons = document.querySelectorAll(".quiz__radio");
  const fieldsets = Array.from(document.querySelectorAll(".quiz__fieldsets .quiz__fieldset"));
  const quizBottom = document.querySelector(".quiz__bottom");
  const form = document.querySelector(".quiz__form");

  // Filter success step from all fieldsets
  const successFieldset = fieldsets.find(fieldsetItem => fieldsetItem.querySelector(".quiz__success-wrapper"));
  const stepsFieldsets = fieldsets.filter(fieldsetItem => fieldsetItem !== successFieldset);

  // Initialize state and maxSteps
  let state = { currentStep: 1 };
  const maxSteps = stepsFieldsets.length;

  // DOM elements in const for easier access
  const elements = {
    progressFill,
    counterElement,
    nextButtons,
    prevButtons,
    submitFormButtons,
    radioButtons,
    quizBottom,
    form,
    fieldsets,
    successFieldset,
    stepsFieldsets,
  };

  // ==========================
  // Initialization
  // ==========================
  stepsFieldsets[0].classList.add("active"); // show first step
  updateProgressBar(elements, state, maxSteps);
  updateButtonsState(elements, state, maxSteps);

  // ==========================
  // Real-time validation for all steps
  // ==========================
  stepsFieldsets.forEach((fieldset) => {
    validateName(fieldset);   // додає input listeners для імені
    validatePhone(fieldset);  // додає input listeners для телефону
  });

  // ==========================
  // Event listeners for quiz 
  // ==========================
  setupEventListeners(elements, state, maxSteps, {
    handleNextClick,
    handlePrevClick,
    handleSubmitClick,
    updateGiftRadioSelection
  });

  // ==========================
  // Ensure updateGiftRadioSelection works on prev button too
  // ==========================
  stepsFieldsets.forEach(() => {
    // Pass elements, state, and maxSteps to the updateGiftRadioSelection
    updateGiftRadioSelection(elements, state, maxSteps);
  })
}
