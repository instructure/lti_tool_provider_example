# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151204000125) do

  create_table "rails_lti2_provider_lti_launches", force: true do |t|
    t.integer  "tool_id",    limit: 8
    t.string   "nonce"
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rails_lti2_provider_registrations", force: true do |t|
    t.string   "uuid"
    t.text     "registration_request_params"
    t.text     "tool_proxy_json"
    t.string   "workflow_state"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tool_id",                     limit: 8
    t.text     "correlation_id"
  end

  add_index "rails_lti2_provider_registrations", ["correlation_id"], name: "index_rails_lti2_provider_registrations_on_correlation_id", unique: true

  create_table "rails_lti2_provider_tools", force: true do |t|
    t.string   "uuid"
    t.text     "shared_secret"
    t.text     "tool_settings"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "lti_version"
  end

end
