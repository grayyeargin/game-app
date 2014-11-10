class CreateTictactoeTable < ActiveRecord::Migration
  def change
    create_table :tic_tac_toe_games do |t|
      t.references :user
      t.string :current_move
      t.string :winner
    end
  end
end
