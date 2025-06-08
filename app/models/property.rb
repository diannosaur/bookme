class Property < ApplicationRecord
  has_many :timeslots, dependent: :destroy

  validates :name, :address, presence: true
end
