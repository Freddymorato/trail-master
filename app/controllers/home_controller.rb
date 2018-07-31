class HomeController < ApplicationController
  before_action :require_login

  def index
    @trails = Trail.all
  end
end
