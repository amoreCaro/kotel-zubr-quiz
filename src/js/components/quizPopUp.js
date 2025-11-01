// quizPopUp.js

function setQuizPopUpLogic() {
  !(function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["../widgets/datepicker"], e)
      : e(jQuery.datepicker);
  })(function (e) {
    "use strict";
    return setUkrainianDatepicker(e);
  });

  jQuery(document).ready(function ($) {
    initPopupLogic($);
    initPhoneMask($);
    initFilters($);
    initSliders();
    initDatepicker($);
    initProductCardSelection($);
    initFormSteps($);
  });
}
