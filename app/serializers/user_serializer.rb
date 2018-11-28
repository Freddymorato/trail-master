class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :trails
  has_many :comments, through: :trails
  has_many :countries, through: :trails
end
