class DashboardController < ApplicationController
  def index
    if (current_user)
      puts current_user
      render json: { user: current_user, auctions: current_user.auctions }
    else
      not_authorized
    end
  end
end
