class ChangeColumnToUser < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :name, :string, index: true, null: false, unique: true
  end

  def down
    change_column :users, :name, :string, null: false, unique: true
  end
end
