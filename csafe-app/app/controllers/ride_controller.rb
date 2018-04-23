class RideController < ApplicationController

  before_action :makeSureRiderAndSignedIn

  def makeSureRiderAndSignedIn
    unless user_signed_in?
      redirect_to unauthenticated_root_path
    end
  end

  def request_ride
    @user_id = current_user.hashid
  end

end
