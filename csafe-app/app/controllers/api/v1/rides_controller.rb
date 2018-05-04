module Api
  module V1
    class RidesController < ApiApplicationController
      def index
        @rides = UserRide.order('created_at DESC')
        render json: {status: 'SUCCESS', message: 'Loaded rides', data:rides},status: :ok
      end

      def CSAFEdailyReport
        respond_to do |format|
          format.html
          format.xlsx{
            dateToday = DateTime.now.strftime("%m/%d/%Y")
            response.headers['Content-Disposition'] = "attachment; filename=" + "CSAFE-DailyReport " + dateToday + ".xlsx"


          }
        end

      end

      def show
        ride = UserRide.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded ride', data:ride},status: :ok
      end

      def create
        @ride = UserRide.new(ride_params)
        if ride.save
          render json: {status: 'SUCCESS', message: 'Saved ride', data:{id: ride.hashid,ride:ride.as_json(:except=>:id)}},status: :ok
        else
          render json: {status: 'ERROR', message: 'Ride not saved', data:ride.errors},status: :unprocessable_entity
        end
      end

      def destroy
        ride = UserRide.find(params[:id])
        ride.destroy
        render json: {status: 'SUCCESS', message: 'Deleted ride', data:{rideID: ride.hashid, userID: ride.userID}},status: :ok
      end

      def update
        ride = UserRide.find(params[:id])
        if ride.update_attributes(ride_params)
          ride.id = ride.hashid
          render json: {status: 'SUCCESS', message: 'Updated ride', data:ride},status: :ok
        else
          render json: {status: 'ERROR', message: 'Ride not updated', data:ride.errors},status: :unprocessable_entity
        end
      end

      def getRidesToday
        rides = UserRide.order('created_at DESC')
        # rides = rides.where("userID = ?", 4)
        rides = rides.where('created_at BETWEEN ? AND ?', DateTime.now.beginning_of_day, DateTime.now.end_of_day).all
        render json: {status: 'SUCCESS', message: 'Loaded rides', data:rides},status: :ok
      end

      private

      def ride_params
        params.permit(:num_passenger, :userEmail, :start_loca_lat,:start_loca_lng,:end_loca_lat,:end_loca_lng,:phone_number,:start_address,:end_address,:accepted,:departed,:complete,:eta)
      end
    end
  end
end
