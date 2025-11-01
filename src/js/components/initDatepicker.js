function initDatepicker(e) {
  e(function () {
    e.datepicker.setDefaults(e.datepicker.regional.uk);
    e("#datepicker").datepicker({ nextText: ">", prevText: "<" });
  });
}