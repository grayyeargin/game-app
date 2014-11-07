class Hangmangame < ActiveRecord::Base
  belongs_to :user

  def correct_letter?(letter)
    game_state_will_change!
    if word.include?(letter)
      index_spots = word.split('').map.with_index {|c, ind| if c == letter then ind end}
      index_spots.map {|ind| if ind != nil then self.game_state[ind] = letter end}
      self.game_state == word ? victory = true : victory = false
      self.update(game_state: self.game_state, good_guesses: good_guesses+letter, last_guess: letter, victory: victory)
    else
      badguess_count == 5 ? victory = true : victory = false
      self.update(bad_guesses: bad_guesses+letter, badguess_count: badguess_count+1, last_guess: letter, victory: victory)
    end
  end
end
