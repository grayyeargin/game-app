class CreateHangmangameTable < ActiveRecord::Migration
  def change
    create_table :hangmangames do |t|
      t.references :user
      t.string :word
      t.string :game_state
      t.integer :badguess_count, default: 0
      t.string :bad_guesses
      t.string :good_guesses
      t.string :last_guess
      t.boolean :victory, default: false
      t.timestamps
    end
  end
end
