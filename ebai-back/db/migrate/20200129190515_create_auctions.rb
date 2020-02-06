class CreateAuctions < ActiveRecord::Migration[6.0]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.decimal :starting_bid_price
      t.decimal :buy_it_now_price
      t.datetime :end_date

      t.timestamps
    end
  end
end
