# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141109012753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hangmangames", force: true do |t|
    t.integer  "user_id"
    t.string   "word"
    t.string   "game_state"
    t.integer  "badguess_count", default: 0
    t.string   "bad_guesses",    default: ""
    t.string   "good_guesses",   default: ""
    t.string   "last_guess"
    t.boolean  "victory"
    t.integer  "score",          default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tictactoegames", force: true do |t|
    t.integer "user_id"
    t.integer "count",   default: 0
    t.string  "winner",  default: "null"
  end

  create_table "users", force: true do |t|
    t.string   "username",      null: false
    t.string   "password_hash", null: false
    t.string   "image_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
