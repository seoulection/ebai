class Auction < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  has_one_attached :image

  validates :title, presence: true
  validates :description, presence: true
  validates :current_bid_price, presence: true
  validates :end_date, presence: true

  def get_image_url
    url_for(self.image)
  end
end
