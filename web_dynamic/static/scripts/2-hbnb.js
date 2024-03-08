$('document').ready(function () {

  // This object will store all the amenities that are checked
  let amenitiesDict = {};

  // This function will verify if the amenity's checkbox is checked.
  // Checked: append its attribute 'data-name' to the object amenitiesDict
  // Unchecked: delete its attribute 'data-name' to the object amenitiesDict
  // Then it writes all the amenities inside the tag <h4> in the header.
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesDict[$(this).attr('data-id')];
	}

    const amenitiesArray = Object.values(amenitiesDict);

    $('.amenities h4').text(amenitiesArray.join(', '));
  });

  // This function fetches data from a local API.
  // If the attribute 'status' is 'OK':
  // 	it adds the class 'available' to the element with id '#api_status'.
  // Else:
  // 	it deletes the class 'available' from the element with id '#api_status'.

// $.getJSON('http://127.0.0.1:5001/api/v1/status/', (data) => {
//     if (data.status === 'OK') {
//       $('#api_status').addClass('available');
//     } else {
//       $('#api_status').removeClass('available');
//     }
//   });
  fetch('http://127.0.0.1:5001/api/v1/status/')
  .then((response) => {
    if (!response.ok) {
      throw new Error('API request failed');
	}

    return (response);
  })
  .then((data) => {
    console.log(data);
    if (data.statusText === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
