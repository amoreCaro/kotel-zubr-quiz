import updateButtonsState from "./updateButtonsState.js";
import updateProgressBar from "./updateProgressBar.js";
import { validateName, validatePhone } from "./validators.js";

// Перевірка кроку (радіо та кастомні інпути)
function validateStep(fieldset) {
  const radios = fieldset.querySelectorAll(".quiz__radio");
  if (!radios.length) return true;

  const checkedRadio = Array.from(radios).find(r => r.checked);
  if (!checkedRadio) {
    fieldset.querySelector(".quiz__options")?.classList.add("error");
    return false;
  }

  const customOption = checkedRadio.closest(".quiz__option--custom");
  if (customOption) {
    const customInput = customOption.querySelector(".quiz__option-input");
    if (!customInput?.value.trim()) {
      fieldset.querySelector(".quiz__options")?.classList.add("error");
      return false;
    }
  }

  fieldset.querySelector(".quiz__options")?.classList.remove("error");
  return true;
}

// Перехід на наступний крок
export function handleNextClick(e, elements, state, maxSteps) {
  e?.preventDefault();
  const steps = Array.from(elements.stepsFieldsets);
  const current = steps[state.currentStep - 1];
  if (!current || !validateStep(current)) return;

  if (state.currentStep < maxSteps) {
    steps.forEach(f => f.classList.remove("active"));
    state.currentStep++;
    steps[state.currentStep - 1].classList.add("active");
    updateProgressBar(elements, state, maxSteps);
    updateButtonsState(elements, state, maxSteps);
  }
}

// Перехід на попередній крок
export function handlePrevClick(e, elements, state, maxSteps) {
  e.preventDefault();
  const steps = Array.from(elements.stepsFieldsets);
  steps.forEach(f => f.classList.remove("active"));

  if (state.currentStep > 1) {
    state.currentStep--;
    steps[state.currentStep - 1].classList.add("active");
    updateProgressBar(elements, state, maxSteps);
    updateButtonsState(elements, state, maxSteps);
  }
}

// Надсилання форми
export function handleSubmitClick(e, elements, state, maxSteps) {
  e.preventDefault();
  const {
    stepsFieldsets, successFieldset, progressFill,
    counterElement, nextButtons, prevButtons, submitFormButtons,
    quizBottom, form
  } = elements;

  const current = stepsFieldsets[state.currentStep - 1];
  if (!current) return;

  // Валідація
  const nameInput = current.querySelector('input[name="name"]');
  const phoneInput = current.querySelector('input[name="phone"]');
  const nameError = current.querySelector('.quiz__error--name');
  const phoneError = current.querySelector('.quiz__error--phone');

  const isNameValid = validateName(current);
  const isPhoneValid = validatePhone(current);

  nameInput?.classList.toggle('error', !isNameValid);
  nameError?.classList.toggle('active', !isNameValid);
  phoneInput?.classList.toggle('error', !isPhoneValid);
  phoneError?.classList.toggle('active', !isPhoneValid);

  if (!isNameValid || !isPhoneValid) return;

  // Лог форми
  if (form) console.log("Form Data:", Object.fromEntries(new FormData(form).entries()));

  // Показати успіх
  current.classList.remove('active');
  successFieldset.classList.add('active');
  progressFill.style.width = '100%';
  counterElement.textContent = `Step: ${maxSteps}/${maxSteps}`;

  // Сховати кнопки
  [nextButtons, prevButtons, submitFormButtons].forEach(btns => btns.forEach(btn => btn.classList.add('hidden')));
  quizBottom.classList.add('disabled');
}
