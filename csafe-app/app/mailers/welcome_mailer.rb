class WelcomeMailer < ApplicationMailer

  def welcome_send(user)
    @user = user
    mail to: user.email, subject: "Welcome to C-Safe!", body: "Welcome to C-Safe!\nWe are happy to have you on board.", from: "info@csafe.com"
  end

end
