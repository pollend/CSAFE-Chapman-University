App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#unaccepted_rides").append(
      "<tr>" +
      #user ID
        "<td>" + data['message']['start_loca_lng'] + "</td>" +
      #phone number
        "<td>" + data['message']['phone_number'] + "</td>" +
      #Requested At
        "<td>" + data['message']['phone_number'] + "</td>" +
      #Updated At
        "<td>" + data['message']['phone_number'] + "</td>" +
      #PickUp Address
        "<td>" + data['message']['start_address'] + "</td>" +
      #Dropoff Address
        "<td>" + data['message']['end_address'] + "</td>" +
      #Accept
        "<td>" <button id= "accept_\" + data['message']['id'] + " type="button" class="btn btn-primary" onclick="acceptRide()" > Accept</button> " </td>" +
      "</tr>"

  #<th>User ID</th>
  #<th>Phone Number</th>
  #<th>Requested At</th>
  #<th>Updated At</th>
  #<th>Pickup Address</th>
  #<th>Dropoff Address</th>
  #<th>Accept</th>

    );


#  <tr>
#    <td ><%= rides.userID %></td>
#                    <td><input id="createdAt_<%= rides.id %>" type="datetime" value="<%= rides.created_at.strftime("%m/%d/%Y at %I:%M%p")%>" readonly></td>
#                    <td><input id="updatedAt_<%= rides.id %>" type="datetime" value="<%= rides.updated_at.strftime("%m/%d/%Y at %I:%M%p")%>" readonly></td>
#                    <td> <button id="accept_<%= rides.id %>" type="button" class="btn btn-primary" onclick="acceptRide()" > Accept</button></td>
#    </tr>

  speak: (message) ->
    @perform 'speak', message: message

  tell: (message) ->
    @perform 'tell', message: message