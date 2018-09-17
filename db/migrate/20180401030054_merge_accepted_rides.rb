class MergeAcceptedRides < ActiveRecord::Migration[5.1]
  def change
    add_column :user_rides, :phone_number, :string, limit: 20
    add_column :user_rides, :start_address, :string, limit: 50
    add_column :user_rides, :end_address, :string, limit: 50
    add_column :user_rides, :accepted, :datetime
    add_column :user_rides, :departed, :datetime
    add_column :user_rides, :complete, :datetime
    add_column :user_rides, :eta, :datetime
  end
end
