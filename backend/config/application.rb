require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module OrdemDeServico
  class Application < Rails::Application
    config.load_defaults 6.0
    config.api_only = true
    config.action_controller.action_on_unpermitted_parameters = false

    config.action_dispatch.rescue_responses.merge!(
      'ActiveRecord::RecordNotFound' => 404,
      'ApplicationController::ActionError' => 422,
      'ActiveRecord::RecordInvalid' => 500
    )

    config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

    if ENV["RAILS_LOG_TO_STDOUT"].present?
      logger           = ActiveSupport::Logger.new(STDOUT)
      logger.formatter = config.log_formatter
      config.logger = ActiveSupport::TaggedLogging.new(logger)
    end
  end
end
