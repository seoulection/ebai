class ConvertCurrencyDecimalIntoIntegerColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :auctions, :starting_bid_price, :bigint
    change_column :auctions, :buy_it_now_price, :bigint
  end
end
