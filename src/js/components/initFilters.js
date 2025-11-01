
function initFilters(e) {
  e("body").on("click", ".toggle-filters", function () {
    let t = e(this),
        i = e(".range-slider-wrapper"),
        advancedFilters = e(".advanced-filters");
    t.html("Show advanced filters");
    i.removeClass("filters-expanded");
    advancedFilters.slideUp();

    e(".slider").each(function () {
      let t = Number(e(this).attr("data-value"));
      e(this).slider({
        value: t,
        range: "min",
        slide: function (t, i) {
          let s = i.value;
          s > 999 && (s = s / 1e3 + "k");
          e(this).find(".value").html(s).attr("data-selected-value", i.value);
        },
      });
    });
  });
}