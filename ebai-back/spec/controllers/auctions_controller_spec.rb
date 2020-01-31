require 'rails_helper'

RSpec.describe AuctionsController, type: :controller do
  let(:user) {
    User.new(first_name: 'Chewbacca', last_name: 'Wookie', email: 'different@email.com', password: 'Grrrrrrrrrrrrr$3')
  }

  let(:valid_attributes) {
    {
      title: 'Apple Comp',
      description: 'really old',
      current_bid_price: 100,
      buy_it_now_price: 1000,
      end_date: DateTime.tomorrow,
      user: user
    }
  }

  let(:invalid_attributes) {
    {
      title: nil,
      description: 'There is no title :surprised_pikachu_face:',
      current_bid_price: '500',
      buy_it_now_price: nil,
      end_date: DateTime.tomorrow,
      user: user
    }
  }

  let(:valid_session) { {} }

  describe 'GET #show' do
    it 'returns http success' do
      auction = Auction.create! valid_attributes
      get :show, params: { id: auction.to_param }
      expect(response).to be_successful
    end

    it 'returns error when auction is not found' do
      get :show, params: { id: 400 }

      assert_response :not_found
    end
  end

  describe "POST #create" do
    before(:each) do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    end

    let(:post_attributes) {
      {
        title: 'Apple Comp',
        description: 'really old',
        current_bid_price: 100,
        buy_it_now_price: 1000,
        end_date: DateTime.tomorrow,
      }
    }

    context "with valid params" do
      it "creates a new Auction" do
        expect {
          post :create, params: {auction: post_attributes}
        }.to change(Auction, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post :create, params: {auction: valid_attributes}
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(auction_url(Auction.last))
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new user" do
        post :create, params: {auction: invalid_attributes}
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
