class EmailRiderMailer < ActionMailer::Base

  def email_rider(rides)
    @rides = rides
    mail(to: @rides.userEmail, subject: 'Your ride has arrived!')

  end
end
