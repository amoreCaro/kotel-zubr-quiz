function initProductCardSelection(e) {
  let t = [];
  e(document).on("click", ".popup__product-card", function (i) {
    let s = e(this),
        r = s.attr("id"),
        n = s.find(".quiz__product-card__checkbox"),
        o = t.indexOf(r);

    if (o !== -1) {
      t.splice(o, 1);
      n.prop("checked", false);
      s.find(".checkmark").remove();
      s.removeClass("product-card--checked");
    } else {
      t.push(r);
      n.prop("checked", true);
      s.append('<span class="checkmark"></span>');
      s.addClass("product-card--checked");
    }
  });
}