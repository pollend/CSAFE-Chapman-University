class RideController < ApplicationController

  before_action :makeSureRiderAndSignedIn

  def makeSureRiderAndSignedIn
    if not user_signed_in?
      redirect_to new_user_session_path
    elsif user_signed_in?
      if not current_user.rider?
        redirect_to root_url
      end
    end
  end

end
