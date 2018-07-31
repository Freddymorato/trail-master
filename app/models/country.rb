class Country < ApplicationRecord
  has_many :trails
  has_many :users, through: :trails

  validates_presence_of :name, :flag
end
