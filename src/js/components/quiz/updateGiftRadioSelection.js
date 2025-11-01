import updateButtonsState from "./updateButtonsState.js";
import updateProgressBar from "./updateProgressBar.js";

export default function updateGiftRadioSelection(elements, currentState, totalSteps) {
  if (!currentState) {
    console.error("State object is undefined.");
    return;
  }

  const giftContainers = document.querySelectorAll(".quiz__gifts");
  if (giftContainers.length === 0) {
    console.error("Не знайдено контейнерів подарунків.");
    return;
  }

  giftContainers.forEach(giftContainer => {
    const giftOptions = giftContainer.querySelectorAll(".quiz__gift");

    giftOptions.forEach(giftOption => {
      const radioInput = giftOption.querySelector('input[type="radio"][name="gift"]');

      // Встановлюємо початковий стан
      if (radioInput?.checked) {
        giftOptions.forEach(gift => gift.classList.remove("checked"));
        giftOption.classList.add("checked");
      }

      // Додаємо обробник на клік
      giftOption.addEventListener("click", () => {
        giftOptions.forEach(gift => gift.classList.remove("checked"));
        radioInput.checked = true;
        giftOption.classList.add("checked");

        const fieldsetsContainer = document.querySelector(".quiz__fieldsets");
        const fieldsets = fieldsetsContainer?.querySelectorAll(".quiz__fieldset");

        if (fieldsets && fieldsets.length > 0) {
          const currentFieldsetIndex = Array.from(fieldsets).indexOf(
            giftOption.closest(".quiz__fieldset")
          );
          const nextFieldset = fieldsets[currentFieldsetIndex + 1];

          if (nextFieldset) {
            const currentActiveFieldset = fieldsetsContainer.querySelector(".quiz__fieldset.active");
            currentActiveFieldset?.classList.remove("active");
            nextFieldset.classList.add("active");

            currentState.currentStep = currentFieldsetIndex + 2;
            updateProgressBar(elements, currentState, totalSteps);
            updateButtonsState(elements, currentState, totalSteps);
          }
        }
      });
    });
  });
}
