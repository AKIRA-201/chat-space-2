FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_image.jpg")
    user_id
    group_id
  end
end

