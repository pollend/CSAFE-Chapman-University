class AddIndexToZoneName < ActiveRecord::Migration[5.1]
  def change
    add_index :zones, :name, unique: true
  end
end
