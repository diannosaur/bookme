class Property < ApplicationRecord
  has_many :timeslots, dependent: :destroy
end
