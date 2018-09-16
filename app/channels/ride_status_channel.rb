class RideStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ride_status_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notify(data)
    user = User.find(data['id'])
    ActionCable.server.broadcast 'ride_status_channel', {id: user.hashid}
  end

  def cancel(data)
    user = User.find(data['id'])
    ActionCable.server.broadcast 'ride_status_channel', {id: user.hashid, cancel: true}
  end
end
