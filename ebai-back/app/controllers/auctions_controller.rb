class AuctionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
  end

  def show
    auction = Auction.find(params[:id])
    render json: { auction: auction, image: auction.get_image_url() }
  end

  def create
    auction = current_user.auctions.new(item_params)
    auction.image.attach(auction_params[:image]) if auction_params[:image].present?

    if auction.save
      render json: auction, status: :created, location: auction
    else
      render json: auction.errors, status: :unprocessable_entity
    end
  end

  private

  def record_not_found(error)
    render json: { error: error.message }, status: :not_found
  end

  def item_params
    {
      title: auction_params[:title],
      description: auction_params[:description],
      current_bid_price: auction_params[:current_bid_price],
      buy_it_now_price: auction_params[:buy_it_now_price],
      end_date: auction_params[:end_date]
    }
  end

  def auction_params
    params.permit(:title, :description, :image, :current_bid_price, :buy_it_now_price, :end_date)
  end
end
