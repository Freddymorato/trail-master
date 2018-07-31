class User < ApplicationRecord
  has_many :trails
  has_many :countries, through: :trails

  has_secure_password

  validates_presence_of :name, :email
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :email, :uniqueness => {:case_sensitive => false}
end
