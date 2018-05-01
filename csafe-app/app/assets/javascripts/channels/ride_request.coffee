App.ride_request = App.cable.subscriptions.create "RideRequestChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $("#unaccepted_rides").append(
      '<tr id="theride_' + data['id'] + '">' +
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
        #Accept
        "<td>" + "<button id='accept_" + data['id'] + "' type='button'" + " class='btn btn-primary'" + " onclick='acceptRide()'" + ">Accept</button></td>"
      "</tr>"
    );
    if (data['cancel']) $("#theride_"+data['id']).remove();

  notify: (id) ->
    @perform 'notify', id: id

  cancel: (id) ->
    @perform 'cancel', id: id