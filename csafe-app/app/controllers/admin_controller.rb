class AdminController < ApplicationController

  before_action :isAdminAndSignedIn

  def isAdminAndSignedIn
    if user_signed_in?
      unless current_user.has_role? :admin
        redirect_to new_user_session_path
      end
    end
  end

  def bounds
    @zones = Zone.all
  end

  def admin
    @hours = BusinessHour.all
    @rides = UserRide.all
  end

end
