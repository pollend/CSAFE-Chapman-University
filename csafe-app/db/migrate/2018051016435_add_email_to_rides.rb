class AddEmailToRides < ActiveRecord::Migration[5.1]
  def change
    add_column :user_rides, :userEmail, :string
  end
end
