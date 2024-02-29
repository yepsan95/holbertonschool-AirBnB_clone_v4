$(document).ready(() => {
  const amenityNames = {};
  const checkbox = $('li > input:checkbox');
  checkbox.click(() => {
    if (this.checked) {
      amenityNames[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityNames[$(this).attr('data-id')];
	}
  });
  const amenitiesArray = Object.values(amenityNames);
  const h4 = $('.amenities >  h4');
  h4.text = amenityNames.join(', ');
});
