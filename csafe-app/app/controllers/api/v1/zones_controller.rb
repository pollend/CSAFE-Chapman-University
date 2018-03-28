module Api
  module V1
    class ZonesController < ApplicationController
      def index
        zones = Zone.order('created_at DESC')
        render json: {status: 'SUCCESS', message: 'Loaded zones', data:zones},status: :ok
      end

      def show
        zone = Zone.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded zone', data:zone},status: :ok
      end

      def create
        zone = Zone.new(zone_params)
        if zone.save
          render json: {status: 'SUCCESS', message: 'Saved zone', data:zone},status: :ok
        else
          render json: {status: 'ERROR', message: 'Zone not saved', data:zone.errors},status: :unprocessable_entity
        end
      end

      def destroy
        zone = Zone.find(params[:id])
        zone.destroy
        render json: {status: 'SUCCESS', message: 'Deleted zone', data:zone},status: :ok
      end

      def update
        zone = Zone.find(params[:id])
        if zone.update_attributes(zone_params)
          render json: {status: 'SUCCESS', message: 'Updated zone', data:zone},status: :ok
        else
          render json: {status: 'ERROR', message: 'Zone not updated', data:zone.errors},status: :unprocessable_entity
        end
      end

      private

      def zone_params
        params.permit(:name,:north,:south,:east,:west)
      end
    end
  end
end