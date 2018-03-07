# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Student
User.create[first_name:"Andrew", last_name:"Dieken", email:"dieke102@mail.chapman.edu", user_name:"dieke102", password:"chapman2018", role:"Student"]
#Student
User.create[first_name:"Megan", last_name:"Yu", email:"yu322@chapman.edu", user_name:"yu322", password:"320CSafe!", role:"Student"]
#Driver
User.create[first_name:"Andre", last_name:"Perkins", email:"perki110@chapman.edu", user_name:"perki110", password:"Playstation@32", role:"Driver"]
#Admin
User.create[first_name:"Rene", last_name:"German", email:"german@chapman.edu", user_name:"germa101", password:"@IlikeJordanshoes@", role:"Admin"]
