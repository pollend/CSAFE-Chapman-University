class PagesController < ApplicationController

  def admin
    @hours = BusinessHour.all
  end

end
