class CreateAcceptedRides < ActiveRecord::Migration[5.1]
  def change
    create_table :accepted_rides do |t|
      t.integer :userID
      t.string :phone_number, limit:20
      t.string :address, limit: 50
      t.datetime :created_at
      t.decimal :start_loca_lat
      t.decimal :start_loca_lng
      t.decimal :end_loca_lat
      t.decimal :end_loca_lng

      t.timestamps
    end
  end
end
