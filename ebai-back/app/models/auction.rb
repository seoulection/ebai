class Auction < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :description, presence: true
  validates :current_bid_price, presence: true
  validates :end_date, presence: true
end
