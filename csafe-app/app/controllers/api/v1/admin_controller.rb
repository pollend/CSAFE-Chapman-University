module Api
  module V1
    class AdminController < ApplicationController
      def remove
        admin = User.find(params[:id])
        admin.remove_role :admin
        if admin.remove_role :admin
          render json: {status: 'SUCCESS', message: 'Removed admin role from '+admin.email, data:admin},status: :ok
        else
          render json: {status: 'ERROR', message: 'Role not saved', data:admin.errors},status: :unprocessable_entity
        end
      end

      def add
        user = User.find_by_email(params[:email])
        if user.add_role :admin
          render json: {status: 'SUCCESS', message: 'Added admin role to '+user.email, data:user},status: :ok
        else
          render json: {status: 'ERROR', message: 'Role not saved', data:user.errors},status: :unprocessable_entity
        end
      end
    end
  end
end