class EtaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "eta_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notify(data)
    user = User.find(data['id'])
    ActionCable.server.broadcast 'eta_channel', {id: user.hashid, eta: data['eta']}
  end
end
