class EtaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "eta_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
