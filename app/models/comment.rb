class Comment < ApplicationRecord
  belongs_to :trail
  belongs_to :user
  validates_presence_of :content, :user_id, :trail_id
end
