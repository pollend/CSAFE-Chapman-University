App.ride_status = App.cable.subscriptions.create "RideStatusChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    console.log(data);
    $('#loader_message_'+data['id']).text("Your ride was accepted!");
    setEta(data['id'], moment().add(20,'m').toDate());
    delay = (ms, func) -> setTimeout func, ms
    delay 3000, ->
      $('#loading_modal_'+data['id']).modal('hide');

  notify: (id) ->
    @perform 'notify', id: id