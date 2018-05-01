class EmailRiderMailer < ApplicationMailer
  default from: "chapmancsafe@gmail.com"

  def send_email(user)
    @user = user
    mail(to: @user.email, subject: "Your ride has arrived!")
  end
end
