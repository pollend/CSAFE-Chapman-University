class RideRequestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ride_request_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notify(data)
    ride = UserRide.find(data['id'])
    ActionCable.server.broadcast 'ride_request_channel', {id: ride.hashid, ride:ride.as_json(:except=>:id)}
  end

  def cancel(data)
    ride = UserRide.find(data['id'])
    ride.destroy
    ActionCable.server.broadcast 'ride_request_channel', {id: ride.hashid, cancel: true}
  end
end
