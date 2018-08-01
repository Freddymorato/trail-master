class CountriesController < ApplicationController

  def index
    @countries = Country.all.order('name ASC')
  end

  def show
    @country = Country.find(params[:id])
    if @country.trails.empty?
      flash[:notice] = "There are no trails for this country."
      redirect_to '/'
    end
  end
end
