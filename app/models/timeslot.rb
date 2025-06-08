class Timeslot < ApplicationRecord
  # before_save :set_status
  belongs_to :property

  validates :viewing_date, :start_time, :end_time, presence: true

  validates :start_time, uniqueness: { scope: [:viewing_date, :property_id], message: "already exists for this property on this date" }

  def time_window
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
