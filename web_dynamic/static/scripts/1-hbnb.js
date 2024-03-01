$('document').ready(function () {
  let amenitiesDict = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesDict[$(this).attr('data-id')];
	}
    const amenitiesArray = Object.values(amenitiesDict);
    $('.amenities h4').text(amenitiesArray.join(', '));
  });
});
