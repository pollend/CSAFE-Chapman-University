class AddLocAndUserToUserRides < ActiveRecord::Migration[5.1]
  def change
    add_column :user_rides, :userID, :int
    add_column :user_rides, :start_loca_lat, :decimal
    add_column :user_rides, :start_loca_lng, :decimal
    add_column :user_rides, :end_loca_lat, :decimal
    add_column :user_rides, :end_loca_lng, :decimal
  end
end
