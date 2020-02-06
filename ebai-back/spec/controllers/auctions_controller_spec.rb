require 'rails_helper'

RSpec.describe AuctionsController, type: :controller do
  let(:user) {
    User.new(first_name: 'Chewbacca', last_name: 'Wookie', email: 'different@email.com', password: 'Grrrrrrrrrrrrr$3')
  }

  let(:valid_attributes) {
    {
      title: 'Apple Comp',
      description: 'really old',
      current_bid_price: 1.00,
      buy_it_now_price: 1000.00,
      end_date: DateTime.tomorrow,
      user: user
    }
  }

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
end
