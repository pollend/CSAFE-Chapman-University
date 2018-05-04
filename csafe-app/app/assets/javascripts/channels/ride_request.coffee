App.ride_request = App.cable.subscriptions.create "RideRequestChannel",


  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
<<<<<<< HEAD
    # Called when there's incoming data on the websocket for this channel
    $("#unaccepted_rides").append(
      "<tr>" +
        #user ID
        "<td>" + data['ride']['userID'] + "</td>" +
        #phone number
        "<td>" + data['ride']['phone_number'] + "</td>" +
        #Requested At
        "<td>" + data['ride']['requested_at'] + "</td>" +
        #PickUp Address
        "<td>" + data['ride']['start_address'] + "</td>" +
        #Dropoff Address
        "<td>" + data['ride']['end_address'] + "</td>" +
        #Passenger Count
        "<td>" + data['ride']['num_passenger'] + "</td>" +
        #User Email
        "<td>" + data['ride']['userEmail'] + "</td>" +
        #Accept
        "<td>" + "<button id='accept_" + data['id'] + "' type='button'" + " class='btn btn-primary'" + " onclick='acceptRide()'" + ">Accept</button></td>"
      "</tr>"
    );
=======

    if (data['cancel'])
      $("#theride_"+data['id']).remove();
    else
      # Called when there's incoming data on the websocket for this channel
      $("#unaccepted_rides").append(
        '<tr id="theride_' + data['id'] + '">' +
          #user ID
          "<td>" + data['ride']['userID'] + "</td>" +
          #phone number
          "<td>" + data['ride']['phone_number'] + "</td>" +
          #Requested At
          "<td>" + moment(data['ride']['created_at']).format('lll') + "</td>" +
          #PickUp Address
          "<td>" + data['ride']['start_address'] + "</td>" +
          #Dropoff Address
          "<td>" + data['ride']['end_address'] + "</td>" +
          #Passenger Count
          "<td>" + data['ride']['num_passenger'] + "</td>" +
          #Accept
          "<td>" + "<button id='accept_" + data['id'] + "' type='button'" + " class='btn btn-primary'" + " onclick='acceptRide()'" + ">Accept</button></td>"
        "</tr>"
      );

    console.log("adding pick up heat map point");
    pickUpHeatMapLocations.push(new google.maps.LatLng(data['ride']['start_loca_lat'], data['ride']['start_loca_lng']));
    console.log(pickUpHeatMapLocations);

    pickUpheatmap = new google.maps.visualization.HeatmapLayer({
      data: pickUpHeatMapLocations,
      map: mapOne
    });

    console.log("adding pick up heat map point");
    dropOffHeatMapLocations.push(new google.maps.LatLng(data['ride']['end_loca_lat'], data['ride']['end_loca_lng']));
    console.log(dropOffHeatMapLocations);
    dropOffheatMap = new google.maps.visualization.HeatmapLayer({
      data: dropOffHeatMapLocations,
      map: mapTwo
    });



>>>>>>> 41e744167b07e1a16ac044c0aea7c8d9c0daa3b8

  notify: (id) ->
    @perform 'notify', id: id
