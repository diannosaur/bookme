class AddUniqueIndexToTimeslots < ActiveRecord::Migration[7.2]
  def change
    add_index :timeslots, [:property_id, :viewing_date, :start_time], unique: true, name: 'index_timeslots_on_property_and_date_and_start_time'
  end
end
