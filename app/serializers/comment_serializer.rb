class CommentSerializer < ActiveModel::Serializer
  # attributes returned in JSON response
  attributes :id, :content, :user_id, :trail_id
  belongs_to :trail
  belongs_to :user
end
