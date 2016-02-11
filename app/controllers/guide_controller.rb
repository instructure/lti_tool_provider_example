require 'ims/lti'
class GuideController < ApplicationController
  def home
  end

  def xml_builder
    @placements = CanvasExtensions::PLACEMENTS
  end

  def xml_config
    tc = IMS::LTI::Services::ToolConfig.new(:title => "Example Tool Provider", :launch_url => blti_launch_url)
    tc.description = "This is a Sample Tool Provider."

    if query_params = request.query_parameters
      platform = CanvasExtensions::PLATFORM
      tc.set_ext_param(platform, :selection_width, query_params[:selection_width])
      tc.set_ext_param(platform, :selection_height, query_params[:selection_height])
      tc.set_ext_param(platform, :privacy_level, 'public')
      tc.set_ext_param(platform, :text, 'Extension text')
      tc.set_ext_param(platform, :icon_url, view_context.asset_url('selector.png'))
      tc.set_ext_param(platform, :domain, request.host_with_port)

      query_params[:custom_params].each { |_, v| tc.set_custom_param(v[:name].to_sym, v[:value]) } if query_params[:custom_params]
      query_params[:placements].each { |k, _| create_placement(tc, k.to_sym) } if query_params[:placements]
    end
    render xml: tc.to_xml(:indent => 2)
  end

  private

  def create_placement(tc, placement_key)
    message_type = request.query_parameters["#{placement_key}_message_type"] || :basic_lti_request
    navigation_params = case message_type
                        when 'content_item_selection'
                          {url: content_item_launch_url, message_type: 'ContentItemSelection'}
                        when 'content_item_selection_request'
                          {url: content_item_request_launch_url, message_type: 'ContentItemSelectionRequest'}
                        else
                          {url: blti_launch_url}
                        end

    navigation_params[:icon_url] = view_context.asset_url('selector.png') + "?#{placement_key}"
    navigation_params[:canvas_icon_class] = "icon-lti"
    navigation_params[:text] = "#{placement_key} Text"

    tc.set_ext_param(CanvasExtensions::PLATFORM, placement_key, navigation_params)
  end
end
