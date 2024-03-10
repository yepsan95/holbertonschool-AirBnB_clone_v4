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
  fetch('http://127.0.0.1:5001/api/v1/status/')
  .then((response) => {
    if (!response.ok) {
      throw new Error('API request failed');
	}

    return (response);
  })
  .then((data) => {
    if (data.statusText === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  const users = {};
  $.getJSON('http://127.0.0.1:5001/api/v1/users', (data) => {
    for (const usr of data) {
      users[usr.id] = usr.first_name + ' ' + usr.last_name;
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(data) {
      // Iterar sobre los lugares obtenidos y agregarlos a la sección de lugares
      for (const place of data) {
		const template = `<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
          <div class="image_guest"></div>
    <br>
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br>
	${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br>
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
        $('.places').append(template);
      };
    },
    error: function(xhr, status, error) {
      console.error('Error:', error);
    }
  });


  $('button').click(function () {
    // Eliminar todos los contenidos dentro de la etiqueta de clase '.places'
    $('.places').empty();
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        'amenities': Object.keys(amenitiesDict)
      }),
      success: function(data) {
        // Iterar sobre los lugares obtenidos y agregarlos a la sección de lugares
        for (const place of data) {
  		const template = `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">
      $${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
            <div class="image_guest"></div>
      <br>
      ${place.max_guest} Guests
          </div>
            <div class="number_rooms">
            <div class="img_room"></div>
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br>
  	${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
          <div class="img_bathrooms"></div>
      <br>
      ${place.number_bathrooms} Bathroom
          </div>
        </div>
      <!-- USER -->
      <div class="user">
      <p><b>Owner: </b>${users[place.user_id]}</p>
      </div>
        <div class="description">
          ${place.description}
        </div>
      </article> <!-- End 1 PLACE Article -->`;
          $('.places').append(template);
        };
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });
});
