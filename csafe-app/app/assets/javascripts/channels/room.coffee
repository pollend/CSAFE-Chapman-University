App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#unaccepted_rides").append(
      "<tr>" +
      #user ID
        "<td>" + data['message']['ride']['userID'] + "</td>" +
      #phone number
        "<td>" + data['message']['ride']['phone_number'] + "</td>" +
      #Requested At
        "<td>" + data['message']['ride']['requested_at'] + "</td>" +
      #Updated At
        "<td>" + data['message']['ride']['updated_at'] + "</td>" +
      #PickUp Address
        "<td>" + data['message']['ride']['start_address'] + "</td>" +
      #Dropoff Address
        "<td>" + data['message']['ride']['end_address'] + "</td>" +
      #Accept
        "<td>" + "<button id='accept_" + data['message']['id'] + "' type='button'" + " class='btn btn-primary'" + " onclick='acceptRide()'" + ">Accept</button></td>"
      "</tr>"
    );

  speak: (message) ->
    @perform 'speak', message: message

  tell: (id) ->
    @perform 'tell', id: id