class BidsController < ApplicationController
  before_action :set_bid, only: [:show, :update, :destroy]
  before_action :get_auction

  # GET /bids
  def index
    @bids = Bid.all

    render json: @bids
  end

  # GET /bids/1
  def show
    render json: @bid
  end

  # POST /bids
  def create
    ##puts 'auction id'
    ##puts :auction_id
    @bid = @auction.bids.new(user_id: current_user.id, amount: params[:amount])

    #@bid = Auction.find(params[:auction_id]).bids.create(user_id: current_user.id, amount: params[:amount])
    #@auction = Auction.find(params[:auction_id])
    #@bid = @auction.bids.create(user_id: current_user, amount: params[:amount])

    if @bid.save
      render json: @bid, status: :created
    else
      render json: @bid.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bids/1
  def update
    if @bid.update(bid_params)
      render json: @bid
    else
      render json: @bid.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bids/1
  def destroy
    @bid.destroy
  end

  private
    def get_auction
      @auction = Auction.find(params[:auction_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_bid
      @bid = Bid.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def bid_params
      params.require(:bid).permit(:amount, :auction_id)
    end
end
