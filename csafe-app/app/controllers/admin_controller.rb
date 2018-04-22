class AdminController < ApplicationController

  before_action :isAdminAndSignedIn

  def isAdminAndSignedIn
    unless user_signed_in?
      redirect_to unauthenticated_root_path
    else
      unless current_user.has_role? :admin
        redirect_to authenticated_root_path
      end
    end
  end

  def bounds
    @zones = Zone.all
  end

  def admin
    @hours = BusinessHour.all
    @rides = UserRide.all
    @admins = User.with_role(:admin, :any)
  end

end
