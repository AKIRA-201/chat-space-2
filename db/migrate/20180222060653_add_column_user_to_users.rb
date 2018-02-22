class AddColumnUserToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :string, null: false, unique: true
  end
end
