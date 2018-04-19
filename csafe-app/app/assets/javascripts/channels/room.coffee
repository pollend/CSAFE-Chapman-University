App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    $("#unaccepted_rides").append(
      "<tr>" +
        "<td>" + data['message']['start_loca_lng'] + "</td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
      "</tr>"
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