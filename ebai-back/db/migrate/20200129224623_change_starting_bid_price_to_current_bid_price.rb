class ChangeStartingBidPriceToCurrentBidPrice < ActiveRecord::Migration[6.0]
  def change
    rename_column :auctions, :starting_bid_price, :current_bid_price
  end
end
