class LoginController < ApplicationController
	def index
		if user_signed_in?
			if current_user.has_role? :admin
				redirect_to "/admin"
			elsif current_user.has_role? :rider
				redirect_to "/ride/request_ride"
			end
		end
	end
end
