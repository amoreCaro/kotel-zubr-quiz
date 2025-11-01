function initFormSteps(e) {
  const i = e(".form-step"),
        s = e(".quiz__form__btn--back"),
        a = e(".quiz__form__btn--next");
  let r = 0;

  function n() {
    e(".form-step").each(function (t, i) { e(i).removeClass("active"); });
    e(e(".form-step")[r]).addClass("active");

    if (i.length - 1 === r) {
      e(".quiz__title__text").text("Вітаємо! Ви пройшли опитування і отримали свій подарунок - 1 500 грн.");
      e(".quiz__header").css({ "padding-right": "13px" });
      e(".quiz__title__text").css({ "font-size": "24px" });
      e(".quiz__title__counter").css({ display: "none" });
      e(".quiz__title__icon").css({ display: "none" });
      e(`#step-${r + 1} input`).focus();
    } else {
      e(".quiz__title__text").text("Пройдіть тест і отримаєте подарунок 1500 грн на покупку комплектуючих");
      e(".quiz__header").css({ "padding-right": "45px" });
      e(".quiz__title__text").css({ "font-size": "14px" });
      e(".quiz__title__counter").css({ display: "block" });
      e(".quiz__title__icon").css({ display: "inline-block" });
    }
  }

  function o() {
    const t = (r / (e(".form-step").length - 1)) * 100;
    e(".progressbar__counter").css("width", `${t}%`);
    e(".quiz__title__counter").text(`${r + 1}/${e(".form-step").length - 1}`);
  }

  function c() {
    var t = e(`#step-${r + 1} input`),
        i = false,
        s = true,
        a = true;

    t.each(function () {
      if ("range" === e(this).attr("type")) return true;
      if ("checkbox" === e(this).attr("type")) e(this).prop("checked") && (i = true);
      else if ("text" === e(this).attr("type")) "" === e(this).val().trim() && (s = false);
      else if (e(this).is('input[type="tel"]')) {
        var t = e(this).val().trim();
        ("" !== t && /^\(\d{3}\) \d{3}-\d{4}$/.test(t)) || (a = false);
      }
    });

    if (!i && t.is(":checkbox")) {
      e(`#step-${r + 1} .quiz__form__warning`).addClass("quiz__form__warning-show");
      e(`#step-${r + 1} .product-card__img img`).css({ border: "1px solid red" });
      e(`#step-${r + 1} .input-checkbox-style`).css({ border: "2px solid red" });
      return false;
    } else if (!s && t.is(":text")) {
      e(`#step-${r + 1} .quiz__form__warning`).addClass("quiz__form__warning-show");
      e(`#step-${r + 1} .quiz__form__container`).addClass("quiz__form__container--error");
      return false;
    } else if (!a && t.is('input[type="tel"]')) {
      e(`#step-${r + 1} .quiz__form__warning`).addClass("quiz__form__warning-show");
      e(".input__wrapper--focus .focus-border--error").css({ display: "block" });
      e(".input__wrapper--focus .focus-border--valid").css({ display: "none" });
      e(`#step-${r + 1} .quiz__form__container input`).focus();
      return false;
    } else {
      e(`#step-${r + 1} .quiz__form__warning`).removeClass("quiz__form__warning-show");
      e(`#step-${r + 1} .quiz__form__container`).removeClass("quiz__form__container--error");
      e(`#step-${r + 1} .quiz__form__container`).removeClass("quiz__form__container--error-phone");
      e(`#step-${r + 1} .product-card__img img`).css({ border: "none" });
      e(`#step-${r + 1} .input-checkbox-style`).css({ border: "2px solid #23b94a" });
      return true;
    }
  }

  a.each(function () {
    e(this).on("click", function (e) { e.preventDefault(); c() && r < i.length - 1 && (r++, n(), o()); });
  });

  s.each(function () {
    e(this).on("click", function (e) { e.preventDefault(); r--; n(); o(); });
  });
}