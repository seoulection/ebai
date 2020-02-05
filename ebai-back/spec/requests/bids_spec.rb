require 'rails_helper'

RSpec.describe "Bids", type: :request do
  let(:user1) {
    User.create(first_name: 'Chewbacca', last_name: 'Wookie', email: 'different@email.com', password: 'Grrrrrrrrrrrrr$3')
  }

  let(:user2) {
    User.create(first_name: 'Yoda', last_name: 'Nolastname', email: 'yo@da.com', password: 'No try, there is')
  }

  let(:valid_attributes) {
    {
      title: 'Apple Comp',
      description: 'really old',
      current_bid_price: 100,
      buy_it_now_price: 1000,
      end_date: DateTime.tomorrow,
      user: user1
    }
  }

  let(:auction) {
    Auction.create! valid_attributes
  }
  
  describe "POST /auctions/:auction_id/bids" do
    it "returns a 'Created' response" do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user2)
      post "/auctions/#{auction.id}/bids", :params => { amount: 500, auction_id: auction.id }
      expect(response).to have_http_status(201)
    end

    it "returns a 'Not Authorized' response" do
      post "/auctions/#{auction.id}/bids", :params => { amount: 500, auction_id: auction.id }
      expect(response).to have_http_status(401)
    end

    it "returns a 'Unprocessable Entity' response" do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user2)
      post "/auctions/#{auction.id}/bids", :params => { whatever: { amount: 500, auction_id: auction.id } }
      expect(response).to have_http_status(422)
    end
  end
end
