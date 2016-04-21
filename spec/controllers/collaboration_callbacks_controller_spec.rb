require 'rails_helper'

describe CollaborationCallbacksController do

  let(:callback_post) { post :confirm_url }
  let(:callback_delete) { delete :confirm_url }

  context 'POST #confirm_url' do
    it 'creates a collaboration callback' do
      callback_post
      c = CollaborationCallback.last
      expect(c.request_method).to eq 'POST'
      expect(c.host).to eq 'test.host'
    end

    it 'after callback save no template is rendered' do
      callback_post
      expect(callback_post).to_not render_template('confirm_url')
    end
  end

  context 'DELETE #confirm_url' do
    it 'creates a collaboration callback' do
      callback_delete
      c = CollaborationCallback.last
      expect(c.request_method).to eq 'DELETE'
      expect(c.host).to eq 'test.host'
    end

    it 'after callback save no template is rendered' do
      callback_delete
      expect(callback_delete).to_not render_template('confirm_url')
    end
  end

end
