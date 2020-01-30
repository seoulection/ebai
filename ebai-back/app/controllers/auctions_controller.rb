class AuctionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
  end

  def show
    auction = Auction.find(params[:id])
    render json: auction
  end

  def create
    @auction = current_user.auctions.new(auction_params)

    if @auction.save
      render json: @auction, status: :created, location: @auction
    else
      render json: @auction.errors, status: :unprocessable_entity
    end
  end

  private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end

  def auction_params
    params.require(:auction).permit(:title, :description, :current_bid_price, :buy_it_now_price, :end_date)
  end
end
