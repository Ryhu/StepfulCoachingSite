class CreateCoaches < ActiveRecord::Migration[6.1]
  def change
    create_table :coaches do |t|
      t.string :firstName, null: false
      t.string :lastName, null: false
      t.string :title
      t.text :introduction
      t.integer :phone

      t.timestamps
    end
  end
end
