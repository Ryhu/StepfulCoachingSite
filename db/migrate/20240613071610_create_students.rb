class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.string :firstName
      t.string :lastName
      t.text :introduction
      t.integer :phone

      t.timestamps
    end
  end
end
