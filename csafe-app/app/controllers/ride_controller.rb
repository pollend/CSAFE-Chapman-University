class RideController < ApplicationController

  before_action :makeSureRiderAndSignedIn

  def makeSureRiderAndSignedIn
    if user_signed_in?
      unless current_user.has_role? :rider
        redirect_to new_user_session_path
      end
    end
  end

end
