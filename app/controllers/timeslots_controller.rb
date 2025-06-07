class TimeslotsController < ApplicationController
  def index
    @timeslots = Timeslot.all
  end

  def new
    @timeslot = Timeslot.new
  end

  def create
    @timeslot = Timeslot.new(timeslot_params)

    if @timeslot.save
      redirect_to timeslots_path, notice: 'Timeslot was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    redirect_to timeslots_path
  end

  private

  def timeslot_params
    params.require(:timeslot).permit(:viewing_date, :start_time, :end_time, :max_guests)
  end
end
