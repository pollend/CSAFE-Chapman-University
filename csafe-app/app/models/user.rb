class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_initialize :set_default_role
  def set_default_role
    self.add_role(:rider) if self.roles.blank?
  end

  def add_role_admin
    self.add_role(:admin)
  end

  def add_role_driver
    self.add_role(:driver)
  end

  def isAdmin?
    self.has_role? :admin
  end

end
