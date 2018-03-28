class CreateBusinessHours < ActiveRecord::Migration[5.1]
  def change
    create_table :business_hours do |t|
      t.string :day
      t.time :start_time
      t.time :end_time
      t.boolean :enabled

      t.timestamps
    end
  end
end
