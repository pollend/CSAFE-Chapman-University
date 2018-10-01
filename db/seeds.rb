# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  rider = User.new
  rider.email = 'user@chapman.edu'
  rider.password = 'password'
  rider.save!

  admin = User.new
  admin.email = 'admin@chapman.edu'
  admin.password = 'password'
  admin.add_role :admin
  admin.save!

  AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

  UserRide.create({userID:1,start_loca_lat:48.84,start_loca_lng:119.38,end_loca_lat:48.48,end_loca_lng:114.223,phone_number:"7146423115",end_address:"1 University Dr", accepted:"2018-04-09 01:58:01"})
  UserRide.create({userID:53,start_loca_lat:48.84,start_loca_lng:119.38,end_loca_lat:48.48,end_loca_lng:114.223,phone_number:"475624242",end_address:"6 University Dr"})
end

Zone.create({name: 'CU Radius', north: 33.809099, south: 33.786070, east: -117.835687, west: -117.861817})
Zone.create({name: 'La Veta Grand Apartments', north: 33.784099, south: 33.780756, east: -117.855300, west: -117.857525})
Zone.create({name: 'Katella Grand', north: 33.805203, south: 33.803510, east: -117.895812, west: -117.897812})
Zone.create({name: 'Panther Village', north: 33.790581, south: 33.789579, east: -117.885786, west: -117.887523})

BusinessHour.create({day:'Monday',start_time:'19:30',end_time:'00:15',enabled:true})
BusinessHour.create({day:'Tuesday',start_time:'19:30',end_time:'00:15',enabled:true})
BusinessHour.create({day:'Wednesday',start_time:'19:30',end_time:'00:15',enabled:true})
BusinessHour.create({day:'Thursday',start_time:'19:30',end_time:'01:45',enabled:true})
BusinessHour.create({day:'Friday',start_time:'19:30',end_time:'02:15',enabled:true})
BusinessHour.create({day:'Saturday',start_time:'19:30',end_time:'02:15',enabled:true})
BusinessHour.create({day:'Sunday',start_time:'19:30',end_time:'02:15',enabled:false})
