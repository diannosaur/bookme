class CreateTimeSlots < ActiveRecord::Migration[7.2]
  def change
    create_table :timeslots do |t|
      t.date :viewing_date
      t.datetime :start_time
      t.datetime :end_time
      t.integer :number_of_guests, default: 0
      t.integer :max_guests, default: 5
      t.string :status, default: 'available'

      t.timestamps
    end
  end
end
