class AdminController < ApplicationController

  before_action :isAdminAndSignedIn

  def isAdminAndSignedIn
    if not user_signed_in?
      redirect_to new_user_session_path
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
