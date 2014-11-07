class Hangmangame < ActiveRecord::Base
  belongs_to :user

  def correct_letter?(letter)
    game_state_will_change!
    #if the word has the guessed letter in it, replace game_status to include letter, and add guess to 'good_guesses'
    if word.include?(letter)
      index_spots = word.split('').map.with_index {|c, ind| if c == letter then ind end}
      index_spots.map {|ind| if ind != nil then self.game_state[ind] = letter end}
      if self.game_state == word then victory = true end
      self.update(game_state: self.game_state, good_guesses: good_guesses+letter, last_guess: letter, victory: victory)
    #If bad guess, add letter to bad guesses and increase badguess_count
    else
      if badguess_count == 5 then victory = false end
      self.update(bad_guesses: bad_guesses+letter, badguess_count: badguess_count+1, last_guess: letter, victory: victory)
    end
  end

end
