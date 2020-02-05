class BidsController < ApplicationController
  before_action :get_auction

  # POST /bids
  def create
    if (current_user)
      @bid = @auction.bids.new(user_id: current_user.id, amount: params[:amount])

      if @bid.save
        render json: @bid, status: :created
      else
        render json: @bid.errors, status: :unprocessable_entity
      end
    else
      not_authorized
    end
  end

  private
    def get_auction
      @auction = Auction.find(params[:auction_id])
    end

    # Only allow a trusted parameter "white list" through.
    def bid_params
      params.require(:bid).permit(:amount, :auction_id)
    end
end
