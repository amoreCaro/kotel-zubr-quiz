export default function quizSlider() {
  const quizInputRange = document.querySelectorAll(".quiz__range-input");
  const quizRangeBubble = document.querySelectorAll(".quiz__range-bubble");

  quizInputRange.forEach((input, index) => {
    const bubble = quizRangeBubble[index];

    // Початкове значення
    updateSlider(input, bubble);

    // Оновлення при зміні слайдера
    input.addEventListener('input', () => {
      updateSlider(input, bubble);
    });
  });

  function updateSlider(input, bubble) {
    const percent = ((input.value - input.min) / (input.max - input.min)) * 100;

    // Рух бульбашки
    bubble.textContent = input.value;
    bubble.style.left = `calc(${percent}% - ${bubble.offsetWidth / 2}px)`;

    // Оновлення CSS змінної для зеленої лінії
    input.style.setProperty('--range-percent', `${percent}%`);
  }
}