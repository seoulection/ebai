class ChangeAuctionsPrimaryKey < ActiveRecord::Migration[6.0]
  def change
    add_column :auctions, :uuid, :uuid, default: 'gen_random_uuid()', null: false

    change_table :auctions do |t|
      t.remove :id
      t.rename :uuid, :id
    end

    execute 'ALTER TABLE auctions ADD PRIMARY KEY (id);'
  end
end
