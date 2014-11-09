class CreateTictactoeTable < ActiveRecord::Migration
  def change
    create_table :tictactoegames do |t|
      t.references :user
      t.integer :count, default: 0
      t.string :winner, default: :null
    end
  end
end
