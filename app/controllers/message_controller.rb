class MessageController < ApplicationController
  include RailsLti2Provider::ControllerHelpers

  skip_before_action :verify_authenticity_token
  before_filter :lti_authentication, except: :youtube

  rescue_from RailsLti2Provider::LtiLaunch::Unauthorized do |ex|
    @error = 'Authentication failed with: ' + case ex.error
                                                when :invalid_signature
                                                  'The OAuth Signature was Invalid'
                                                when :invalid_nonce
                                                  'The nonce has already been used'
                                                when :request_to_old
                                                  'The request is to old'
                                                else
                                                  'Unknown Error'
                                              end
    @message = IMS::LTI::Models::Messages::Message.generate(request.request_parameters.merge(request.query_parameters))
    @header = SimpleOAuth::Header.new(:post, request.url, @message.post_params, consumer_key: @message.oauth_consumer_key, consumer_secret: 'secret', callback: 'about:blank')
    render :basic_lti_launch_request, status: 200
  end

  def basic_lti_launch_request
    process_message
  end

  def content_item_selection
    process_message
  end

  def youtube
    redirect_to params[:youtube_url]
  end

  private

  def process_message
    @secret = "&#{RailsLti2Provider::Tool.find(@lti_launch.tool_id).shared_secret}"
    #TODO: should we create the lti_launch with all of the oauth params as well?
    @message = (@lti_launch && @lti_launch.message) || IMS::LTI::Models::Messages::Message.generate(request.request_parameters.merge(request.query_parameters))
    @header = SimpleOAuth::Header.new(:post, request.url, @message.post_params, consumer_key: @message.oauth_consumer_key, consumer_secret: 'secret', callback: 'about:blank')
  end

end