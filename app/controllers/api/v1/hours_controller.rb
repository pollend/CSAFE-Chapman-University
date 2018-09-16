module Api
  module V1
    class HoursController < ApiApplicationController
      before_action :is_admin
      def update
        biz_hours = BusinessHour.find(params[:id])
        if biz_hours.update_attributes(hours_params)
          render json: {status: 'SUCCESS', message: 'Updated business hour', data:biz_hours},status: :ok
        else
          render json: {status: 'ERROR', message: 'Business hours not updated', data:biz_hours.errors},status: :unprocessable_entity
        end
      end

      private

      def hours_params
        params.permit(:start_time,:end_time,:enabled)
      end

    end
  end
end