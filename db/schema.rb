# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_06_14_052534) do

  create_table "coaches", force: :cascade do |t|
    t.string "firstName", null: false
    t.string "lastName", null: false
    t.string "title"
    t.text "introduction"
    t.integer "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "lessons", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "notes"
    t.integer "score"
    t.integer "coachId"
    t.integer "studentId"
    t.string "date"
    t.integer "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "firstName"
    t.string "lastName"
    t.text "introduction"
    t.integer "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
