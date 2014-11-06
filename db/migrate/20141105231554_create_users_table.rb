class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :password_hash, null: false
      t.string :image_url
      t.timestamps
    end
  end
end
