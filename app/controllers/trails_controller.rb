class TrailsController < ApplicationController
  before_action :set_trail, only: [:show, :edit, :update, :destroy]
  before_action :validate_user_info
  skip_before_action :validate_user_info, only: [:show, :trails_by_time, :trails_by_distance, :trails_by_difficulty]


  def new
    @trail = Trail.new
  end

  def show
  end

  def create
    @trail = Trail.new(trail_params)
    if @trail.save
      flash[:msg] = "Trail successfully created."
      redirect_to '/'
    else
      render :new
    end
  end

  def edit
  end

  def update
    @trail.update(trail_params)
    if @trail.save
      flash[:msg] = "Trail successfully updated."
      redirect_to root_path
    else
      render :edit
    end
  end

  def trails_by_time
    list = Trail.search(params[:search]).order("created_at DESC")
    if !list.empty?
      @trails = list
    else
      flash[:notice] = "There are no trails matching the input."
      redirect_to '/'
     end
  end

  def trails_by_distance
    list = Trail.search2(params[:search]).order("created_at DESC")
    if !list.empty?
      @trails = list
    else
      flash[:notice] = "There are no trails matching the input."
      redirect_to '/'
    end
  end

  def trails_by_difficulty
    list = Trail.search3(params[:search]).order("created_at DESC")
    if !list.empty?
      @trails = list
    else
      flash[:notice] = "There are no trails matching the input."
      redirect_to '/'
    end
  end

  def destroy
    @trail.destroy
    flash[:msg] = "Trail successfully deleted."
    redirect_to '/'
  end

  private

  def trail_params
    params.require(:trail).permit(:name, :image, :distance, :duration, :dangers, :difficulty, :user_id, :country_id)
  end

  def set_trail
    @trail = Trail.find(params[:id])
  end
end
