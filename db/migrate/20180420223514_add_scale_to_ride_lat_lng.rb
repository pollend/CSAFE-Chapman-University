class AddScaleToRideLatLng < ActiveRecord::Migration[5.1]
  def change
    change_column :user_rides, :start_loca_lat, :decimal, {:precision=>10, :scale=>6}
    change_column :user_rides, :start_loca_lng, :decimal, {:precision=>10, :scale=>6}
    change_column :user_rides, :end_loca_lat, :decimal, {:precision=>10, :scale=>6}
    change_column :user_rides, :end_loca_lng, :decimal, {:precision=>10, :scale=>6}
  end
end
