class AddAuctionIdToBid < ActiveRecord::Migration[6.0]
  def change
    add_reference :bids, :auction, type: :uuid, null: false, foreign_key: true
  end
end
