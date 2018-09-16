class RemovePermissions < ActiveRecord::Migration[5.1]
  def change
    drop_table :permissions
    drop_table :user_permissions
  end
end
