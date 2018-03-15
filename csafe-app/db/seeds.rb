# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
rider1 = User.new
rider1.email = 'dieke102@mail.chapman.edu'
rider1.password = 'chapman2018'
rider1.save!

rider2 = User.new
rider2.email = 'yu322@chapman.edu'
rider2.password = '320CSafe!'
rider2.save!

driver = User.new
driver.email = 'perki110@chapman.edu'
driver.password = 'Playstation@32'
driver.role = driver.set_role_driver
driver.save!

admin = User.new
admin.email = 'german@chapman.edu'
admin.password = '@IlikeJordanshoes@'
admin.role = admin.set_role_admin
admin.save!

User.create!({:email => "2dieke102@mail.chapman.edu", :role => "rider", :password => "@#taawktljasktlw4aaglj", :password_confirmation => "@#taawktljasktlw4aaglj" })
User.create!({:email => "2yu322@chapman.edu", :role => "rider", :password => "@#taawktljasktlw4aaglj", :password_confirmation => "@#taawktljasktlw4aaglj" })
User.create!({:email => "2perki110@chapman.edu", :role => "driver", :password => "@#taawktljasktlw4aaglj", :password_confirmation => "@#taawktljasktlw4aaglj" })
User.create!({:email => "2german@chapman.edu", :role => "admin", :password => "@#taawktljasktlw4aaglj", :password_confirmation  => "@#taawktljasktlw4aaglj" })