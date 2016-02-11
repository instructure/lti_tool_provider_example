class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from RailsLti2Provider::LtiLaunch::Unauthorized do |ex|
    render :text => 'Unauthorized', :status => 401
  end

end
