class AuctionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
  end

  def show
    auction = Auction.find(params[:id])
    render json: auction
  end

  private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end
end
