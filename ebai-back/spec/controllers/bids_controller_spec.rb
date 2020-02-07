require 'rails_helper'

RSpec.describe BidsController, type: :controller do
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

  let(:invalid_attributes) {
    {
      title: 'Apple Comp',
      description: 'really old',
      current_bid_price: 'hello',
      buy_it_now_price: 1000,
      end_date: DateTime.tomorrow,
      user: user1
    }
  }

  let(:auction) {
    Auction.create! valid_attributes
  }

  let(:valid_session) { {} }

  before(:each) do
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user2)
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Bid" do
        expect {
          post :create, params: {amount: 400, auction_id: auction.id}, session: valid_session
        }.to change(Bid, :count).by(1)
      end

      it "renders a JSON response with the new bid" do
        new_auction = Auction.create! valid_attributes
        post :create, params: {amount: 900, auction_id: new_auction.id}, session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(JSON.parse(response.body)['amount']).to eq(900)
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new bid" do

        post :create, params: {whatever: {amount: 9001}, auction_id: auction.id}, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(JSON.parse(response.body)['amount']).to eq(["can't be blank"])
      end
    end
  end
end
