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
      image: {io: File.open('./spec/logo.png'), filename: 'logo.png'},
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
      image: {},
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

    context "with valid params" do
      it "creates a new Auction" do
        expect {
          post :create, params: valid_attributes
        }.to change(Auction, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post :create, params: valid_attributes
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new user" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    let(:update_attributes) {
      {
        title: 'Microsoft',
        description: 'Brand new',
        current_bid_price: 3000,
        buy_it_now_price: 15000,
        end_date: DateTime.tomorrow
      }
    }

    let(:invalid_update_attributes) {
      {
        title: 0,
        description: 1,
        current_bid_price: {hi: 'test'},
        buy_it_now_price: 15000,
        end_date: 500
      }
    }

    before(:each) do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    end

    it "updates an existing auction" do
      auction = Auction.create! valid_attributes
      put :update, params: {
        title: 'Microsoft',
        description: 'Brand new',
        current_bid_price: 3000,
        buy_it_now_price: 15000,
        end_date: DateTime.tomorrow,
        id: auction.id
      }
      expect(response).to have_http_status(:success)
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)['title']).to eq('Microsoft')
    end

    # TODO
    # it "fails an existing auction" do
    #   auction = Auction.create! valid_attributes
    #   put :update, params: {auction: invalid_update_attributes, id: auction.id}
    #   expect(response).to have_http_status(:unprocessable_entity)
    #   expect(response.content_type).to eq('application/json; charset=utf-8')
    # end
  end
end
