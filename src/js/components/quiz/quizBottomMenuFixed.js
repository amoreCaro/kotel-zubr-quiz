export default function quizBottomMenuFixed() {
  const quizBottom = document.querySelector('.quiz__bottom');
  const quizForm = document.querySelector('.quiz__form');

  if (!quizBottom || !quizForm) return;

  function checkFixed() {
    // лише для мобільних
    if (window.innerWidth > 640) {
      quizBottom.classList.remove('fixed');
      return;
    }

    const formRect = quizForm.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const startFixAt = formRect.top + formRect.height / 2;

    // якщо проскролили нижче середини, але ще не дійшли до кінця
    if (startFixAt <= viewportHeight && formRect.bottom > viewportHeight) {
      quizBottom.classList.add('fixed');
    } else {
      // до середини або після кінця форми
      quizBottom.classList.remove('fixed');
    }
  }

  // перевірка при старті
  checkFixed();

  // слухаємо події
  window.addEventListener('scroll', checkFixed);
  window.addEventListener('resize', checkFixed);
}
