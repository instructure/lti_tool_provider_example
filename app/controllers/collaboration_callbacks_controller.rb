class CollaborationCallbacksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:confirm_url]
  require 'resolv'

  def confirm_url
    @callback = CollaborationCallback.new do |c|
      c.request_method = request.method
      if request.remote_ip == '0.0.0.0'
        c.host = request.host
      else
        c.host = Resolv.getname(request.remote_ip)
      end
      c.save
    end
    if @callback.save
      render nothing: true
    end
  end

end
