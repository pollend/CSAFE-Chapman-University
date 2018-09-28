FactoryBot.define do
  factory :user do
    email { |i| "johnsmith_#{i}@chapman.edu" }
    password "password"
    password_confirmation "password"
  end
end
