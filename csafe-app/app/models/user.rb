class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  enum role: [:rider, :driver, :admin]
  after_initialize :set_default_role, :if => :new_record?
  def set_default_role
    self.role ||= :rider
  end

  def set_role_admin
    self.role = :admin
  end

  def set_role_driver
    self.role = :driver
  end

end
