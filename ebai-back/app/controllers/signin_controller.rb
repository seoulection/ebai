class SigninController < ApplicationController
  # before_action :authorize_access_request!, except: [:index, :create]

  def index
    if (current_user)
      render json: @current_user
    else
      not_authorized
    end
  end

  def create
    user = User.find_by!(email: params[:user][:email])
    if user.authenticate(params[:user][:password])
      authenticate_user(user)
    else
      not_authorized
    end
  end

  def destroy
    puts "hello i am in delete"
    puts current_user
    # session.delete(current_user.id)
    reset_session
  end

  private

  def not_found
    render json: { error: "Cannot find email/password combination" }, status: :not_found
  end
end
