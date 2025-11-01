// Validate name input
export function validateName(fieldsetElement) {
  const nameInput = fieldsetElement.querySelector('input[name="name"]');
  if (!nameInput) return false;

  const pattern = /^[a-zA-Zа-яА-ЯЇїІіЄєҐґ'’\-\s]+$/;
  // Remove invalid characters while typing
  nameInput.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯЇїІіЄєҐґ'’\-\s]/g, '');
  });
  // Return true if value is valid
  const value = nameInput.value.trim();
  return value && pattern.test(value);
}
// Validate phone input
export function validatePhone(fieldset) {
  const phoneField = fieldset.querySelector('input[name="phone"]');
  if (!phoneField) return false;

  const phonePattern = /^[\d\+\(\)\-\s]+$/;

  // Clean input and limit digits to 12
  phoneField.addEventListener('input', e => {
    let inputValue = e.target.value;

    // Remove invalid characters (anything except digits, +, (), - or space)
    inputValue = inputValue.replace(/[^\d\+\(\)\-\s]/g, '');

    // Count only digits
    const digitOnly = inputValue.replace(/[^\d]/g, '');

    // If there are more than 12 digits, remove excess from the end
    if (digitOnly.length > 12) {
      let extraDigits = digitOnly.length - 12;
      let index = inputValue.length - 1;

      while (extraDigits > 0 && index >= 0) {
        if (/\d/.test(inputValue[index])) {
          // Remove this digit
          inputValue = inputValue.slice(0, index) + inputValue.slice(index + 1);
          extraDigits--;
        }
        index--;
      }
    }

    phoneField.value = inputValue;
  });

  // Validate on submit/next
  const trimmedValue = phoneField.value.trim();
  const digitCount = trimmedValue.replace(/[^\d]/g, '').length;

  return trimmedValue && phonePattern.test(trimmedValue) && digitCount >= 7 && digitCount <= 12;
}