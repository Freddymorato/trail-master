class CreateTrails < ActiveRecord::Migration[5.2]

  def change
    create_table :trails do |t|
      t.string :name
      t.string :image
      t.integer :distance
      t.integer :duration
      t.text :dangers
      t.integer :difficulty
      t.integer :user_id
      t.integer :country_id

      t.timestamps
    end
  end
end
