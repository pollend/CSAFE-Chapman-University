class CreateUserRides < ActiveRecord::Migration[5.1]
  def change
    create_table :user_rides do |t|

      t.timestamps
    end
  end
end
