function initSliders() {
  $(".slider").each(function () {
    let t = Number($(this).attr("data-min")),
        i = Number($(this).attr("data-max")),
        s = Number($(this).attr("data-value")),
        a = Number($(this).attr("data-step")),
        r = $(this);

    r.slider({
      range: "min",
      value: s,
      min: t,
      max: i,
      step: a,
      slide: function (t, i) {
        let s = i.value;
        $(this).find(".value").html(s).attr("data-selected-value", i.value);
        $(this).siblings('input[type="range"]').val(s);
      },
    });

    let n = r.find(".ui-slider-handle"),
        o = n.parent().attr("data-value");

    n.append('<span id="rangeSliderCurrentValue" class="value min-value" data-selected-value="' + o + '"></span>');
    r.find(".value").html(s);
  });
}
