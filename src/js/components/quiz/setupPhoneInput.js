export default function setupPhoneInput(selector = "#phone") {
  const phoneInputField = document.querySelector(selector);
  if (!phoneInputField) return null;

  const phoneInput = window.intlTelInput(phoneInputField, {
    // Початкова країна
    initialCountry: "ua",
    // Автовизначення за IP (опціонально)
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("ua"));
    },
    nationalMode: false, // показує код країни
    autoHideDialCode: false,
    formatOnDisplay: true,
    separateDialCode: true, // відокремлює код від номера
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // Забороняємо видаляти код країни
  phoneInputField.addEventListener("keydown", (e) => {
    const dialCode = document
      .querySelector(".iti__selected-dial-code")
      ?.textContent?.trim();
    if (
      e.key === "Backspace" &&
      phoneInputField.value.trim().startsWith(dialCode) &&
      phoneInputField.selectionStart <= dialCode.length
    ) {
      e.preventDefault();
    }
  });

  return phoneInput;
}