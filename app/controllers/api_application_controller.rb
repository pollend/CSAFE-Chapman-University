class ApiApplicationController < ApplicationController
  before_action :authenticate_user!
  UNAUTHORIZED_MESSAGE = 'You must be signed in to continue'
  def is_admin
    if not current_user.has_role? :admin
      render json: {status: 'ERROR', message: UNAUTHORIZED_MESSAGE},status: :unauthorized
    end
  end
end
