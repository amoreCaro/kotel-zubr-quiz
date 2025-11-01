import quizSlider from "./components/quiz/quizSlider.js";
import setupCustomOptionToggle from "./components/quiz/setupCustomOptionToggle.js";
import setupPhoneInput from "./components/quiz/setupPhoneInput.js";
import quizBottomMenuFixed from "./components/quiz/quizBottomMenuFixed.js";
import progressbar from "./components/quiz/progressbar.js";

document.addEventListener('DOMContentLoaded', function () {
  // country flag in phone input 
  quizSlider();
  setupPhoneInput();
  setupCustomOptionToggle();
  quizBottomMenuFixed();
  progressbar();
}); 