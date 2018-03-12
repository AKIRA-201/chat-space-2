json.messages @new_message.each do |message|
  json.body  message.body
  json.user_name  message.user.name
  json.image  message.image
  json.created_at  message.created_at
  if @new_message.present?
    json.id  message.id
  end
end
