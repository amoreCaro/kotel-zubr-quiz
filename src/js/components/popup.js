function initPopupLogic(e) {
  // Open popup
  e("#show-quiz-modal").click(function () {
    // on click adding class 
    e("#quiz-poup").addClass("quiz__popup-show");
    // move quiz__body and add opacity
    e(".quiz__body").css({ opacity: "1", transform: "translateY(0) scale(1)" });
  });

  // Close popup
  e(document).on("click", function (t) {
    // Check if click is not on 
    if (
      !e(t.target).closest(".quiz__body").length &&
      !e(t.target).is("#show-quiz-modal") &&
      !e(t.target).is(".ui-datepicker-prev") &&
      !e(t.target).is(".ui-datepicker-next") &&
      !e(t.target).is(".ui-icon") &&
      !e(t.target).closest("#ui-datepicker-div").length
    ) {
      e(".quiz__body").css({ opacity: "0", transform: "translateY(30%) scale(.9)" });
      // remove show class 
      e("#quiz-poup").removeClass("quiz__popup-show");
    }
  });

  // Submit button
  e("#btn-submit").on("click", function (t) {
    t.preventDefault();
    // Відправляємо форму
    c() && (e("#quiz-form").submit(),
    // Show successful message
    e(".popup__successful_application").addClass("popup__successful_application--visible"));
  });
}