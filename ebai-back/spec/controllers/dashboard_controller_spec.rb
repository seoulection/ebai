require 'rails_helper'

RSpec.describe DashboardController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      user = User.new(first_name: 'Chewbacca', last_name: 'Wookie', email: 'different@email.com', password: 'Grrrrrrrrrrrrr$3')
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      get :index
      expect(response).to have_http_status(:success)
    end
  end

end
