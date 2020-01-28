class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  def authenticate_user(user)
    session[:user_id] = user.id
  end

  def get_session_id
    session[:user_id]
  end

  private

  def current_user
    @current_user ||= session[:user_id] && User.find(session[:user_id])
  end

  def not_authorized
    render json: { error: 'Not Authorized' }, status: :unauthorized
  end
end
