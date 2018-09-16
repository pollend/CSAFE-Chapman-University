class AddPassengerCountToUserRides < ActiveRecord::Migration[5.1]
  def change
    add_column :user_rides, :num_passenger, :integer
  end
end
