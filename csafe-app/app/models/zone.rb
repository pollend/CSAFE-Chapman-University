class Zone < ApplicationRecord
  validates :name, presence: true
  validates :north, presence: true
  validates :south, presence: true
  validates :east, presence: true
  validates :west, presence: true
end
