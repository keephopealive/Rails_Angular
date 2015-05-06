json.array!(@users) do |user|
  json.extract! user, :id, :index, :new, :create, :edit, :update, :show, :destroy
  json.url user_url(user, format: :json)
end
