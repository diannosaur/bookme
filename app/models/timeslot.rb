class Timeslot < ApplicationRecord
  # before_save :set_status
  belongs_to :property

  validates :viewing_date, :start_time, :end_time, presence: true

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
