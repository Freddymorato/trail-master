class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :distance, :duration, :dangers, :difficulty, :user_id, :country_id
  belongs_to :user
  belongs_to :country
  has_many :comments
end
