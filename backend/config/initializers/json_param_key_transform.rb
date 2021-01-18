module JsonParamKeyTransform
  def process_action(*args)
    request.parameters.deep_transform_keys!(&:underscore)
    super
  end
end

ActiveSupport.on_load(:action_controller) do
  include JsonParamKeyTransform
end
