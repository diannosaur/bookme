module Api
  class TimeslotsController < ApplicationController
    def index
      @timeslots = Timeslot.all
      render json: @timeslots
    end
  end
end
