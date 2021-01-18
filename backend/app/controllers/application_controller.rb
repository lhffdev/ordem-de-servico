class ApplicationController < ActionController::API
  class ActionError < StandardError; end

  rescue_from StandardError do |e|
    render json: { error: e.message }, status: ActionDispatch::ExceptionWrapper.status_code_for_exception(e.class.name)
  end
  
  def with_transaction(&block)
    ActiveRecord::Base.transaction do
      yield
    rescue StandardError
      raise
    end
  end

  def error(message)
    raise ActionError, message.to_hash.map {|key, value| value}.join('/') if message.respond_to?(:full_messages)

    raise ActionError, message
  end
end
