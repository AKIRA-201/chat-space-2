class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :group_name, null: false, unique: true
      t.timestamps
    end
  end
end
