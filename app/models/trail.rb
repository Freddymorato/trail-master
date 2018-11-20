class Trail < ApplicationRecord
  belongs_to :user
  belongs_to :country
  has_many :comments
  accepts_nested_attributes_for :comments

  validates_presence_of :name, :image, :distance, :duration, :dangers, :difficulty, :user_id, :country_id

  mount_uploader :image, ImageUploader
  validate :image_size_validation

  def self.search(search)
    where("duration LIKE ? ", "#{search}")
  end

  def self.search2(search)
    where("distance LIKE ? ", "#{search}")
  end

  def self.search3(search)
    where("difficulty LIKE ? ", "#{search}")
  end

  private

  def image_size_validation
    errors[:image] << "should be less than 500KB" if image.size > 0.5.megabytes
  end
end
