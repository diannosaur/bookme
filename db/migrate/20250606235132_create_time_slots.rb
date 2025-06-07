class CreateTimeSlots < ActiveRecord::Migration[7.2]
  def change
    create_table :time_slots do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.integer :total_booked

      t.timestamps
    end
  end
end
