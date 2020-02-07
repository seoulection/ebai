class AuctionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
    now = DateTime.now
    auctions = Auction.where('end_date > ?', now).order(end_date: :asc)

    auctions_with_image = auctions.map { |auction| auction.as_json.merge!(image: auction.get_image_url())}
    render json: auctions_with_image, status: 200
  end

  def show
    puts 'in show'
    puts params[:id]
    auction = Auction.find(params[:id])
    bids = auction.bids
    render json: { auction: auction, bids: bids, image: auction.get_image_url() }
  end

  def create
    auction = current_user.auctions.new(item_params)
    puts 'the auction is'
    puts auction
    auction.image.attach(auction_params[:image]) if auction_params[:image].present?

    if auction.save
      render json: auction, status: :created, location: auction
    else
      render json: auction.errors, status: :unprocessable_entity
    end
  end

  def bid 
    @auction = Auction.update(params[:id], auction_params)

    if @auction
      render json: @auction, status: 200, location: @auction
    else
      render json: { error: 'Update failed' }, status: :unprocessable_entity
    end
  end

  def update
    auction = Auction.find(params[:id])
    auction.title = params[:title]
    auction.description = params[:description]

    if auction_params[:image] != 'null'
      auction.image.purge
      auction.image.attach(auction_params[:image])
      auction.save
    end

    if auction.save
      render json: auction, status: 200, location: auction
    else
      render json: { error: 'Update failed' }, status: :unprocessable_entity
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
