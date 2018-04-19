class ChangeAddressLimit < ActiveRecord::Migration[5.1]
  def change
    change_column :user_rides, :start_address, :string
    change_column :user_rides, :end_address, :string
  end
end
