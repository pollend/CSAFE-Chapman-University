class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'room_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast 'room_channel', {message: data['message']}
  end

  def tell(data)
    ride = UserRide.find(data['id'])
    ActionCable.server.broadcast 'room_channel', {message:{id: ride.hashid,ride:ride.as_json(:except=>:id)}}
  end
end
