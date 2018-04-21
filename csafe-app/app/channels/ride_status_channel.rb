class RideStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ride_status_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
