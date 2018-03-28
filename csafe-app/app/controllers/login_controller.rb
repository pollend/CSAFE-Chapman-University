class LoginController < ApplicationController
	def index
		if user_signed_in?
			if current_user.rider?
				redirect_to "/ride/request_ride"
			elsif current_user.admin?
				redirect_to "/admin/bounds"
			end
		end
  end
end
