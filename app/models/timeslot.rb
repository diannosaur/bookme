class Timeslot < ApplicationRecord
  before_save :set_status

  def time
    "#{start_time} - #{end_time}"
  end

  private

  def set_status
    self.status = if number_of_guests < 5
                    'available'
                  else
                    'booked'
                  end
  end
end
