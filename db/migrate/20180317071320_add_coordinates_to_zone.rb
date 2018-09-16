class AddCoordinatesToZone < ActiveRecord::Migration[5.1]
  def change
    add_column :zones, :north, :decimal, {:precision=>10, :scale=>6}
    add_column :zones, :south, :decimal, {:precision=>10, :scale=>6}
    add_column :zones, :east, :decimal, {:precision=>10, :scale=>6}
    add_column :zones, :west, :decimal, {:precision=>10, :scale=>6}
  end
end
