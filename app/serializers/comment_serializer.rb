class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :trail_id, :comment_owner
  belongs_to :trail
  belongs_to :user
end
