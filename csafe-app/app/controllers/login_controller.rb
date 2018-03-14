class LoginController < ApplicationController
	def index
		if user_signed_in?
			if current_user.rider?
				redirect_to "/ride/request_ride"
			end
		end
  end
end
