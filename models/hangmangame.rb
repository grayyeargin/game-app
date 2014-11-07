class Hangmangame < ActiveRecord::Base
  belongs_to :user

  def correct_letter?(letter)
    game_state_will_change!
    #if the word has the guessed letter in it, replace game_status to include letter, and add guess to 'good_guesses'
    if word.include?(letter)
      index_spots = word.split('').map.with_index {|c, ind| if c == letter then ind end}
      index_spots.map {|ind| if ind != nil then self.game_state[ind] = letter end}
      # self.game_state == word ? victory = true : victory = false
      victory = self.victory?
      self.update(game_state: self.game_state, good_guesses: good_guesses+letter, last_guess: letter, victory: victory)
    #If bad guess, add letter to bad guesses and increase badguess_count
    else
      # badguess_count == 5 ? victory = true : victory = false
      victory = self.victory?
      self.update(bad_guesses: bad_guesses+letter, badguess_count: badguess_count+1, last_guess: letter, victory: victory)
    end
  end

  def victory?
    if self.game_state == word
      victory = true
    elsif badguess_count == 5
      victory = false
    else
      nil
    end
  end

end
