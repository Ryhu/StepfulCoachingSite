class CreateLessons < ActiveRecord::Migration[6.1]
  def change
    create_table :lessons do |t|
      t.string :title
      t.text :description
      t.text :notes
      t.integer :score
      t.integer :coachId
      t.integer :studentId
      t.string :date
      t.integer :time
      
      t.timestamps
    end
  end
end
