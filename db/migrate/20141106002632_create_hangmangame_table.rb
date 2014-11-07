class CreateHangmangameTable < ActiveRecord::Migration
  def change
    create_table :hangmangames do |t|
      t.references :user
      t.string :word
      t.string :game_state
      t.integer :badguess_count, default: 0
      t.string :bad_guesses, default: ""
      t.string :good_guesses, default: ""
      t.string :last_guess
      t.boolean :victory, default: false
      t.timestamps
    end
  end
end
