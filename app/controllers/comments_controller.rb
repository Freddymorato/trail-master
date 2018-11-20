class CommentsController < ApplicationController
  before_action :validate_user_info, only: [:create, :edit, :update, :destroy]
  before_action :set_comment, only: [:show, :edit, :update, :destroy]


  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    render json: @comment
  end

  def new
  end

  def create
    @comment = Comment.create(content: params[:comment][:content], user_id: params[:user_id], trail_id: params[:trail_id])
    render json: @comment
  end

  def update
    @comment.update(content: params[:comment][:content], user_id: params[:user_id], trail_id: params[:trail_id])
    render json: @comment
  end

  def destroy
    @comment.destroy
  end


  private

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
