class TimeslotsController < ApplicationController
  def index
    @timeslots = Timeslot.all
  end

  def new
    @timeslot = Timeslot.new
    @property = Property.find(params[:property_id]) if params[:property_id].present?
    if @property
      @timeslot.property = @property
    else
      @timeslot.errors.add(:base, "Property not found")
      render :new, status: :unprocessable_entity
      return
    end
  end

  def create
    @property = Property.find(params[:property_id]) if params[:property_id].present?
    if @property
      @timeslot = @property.timeslots.build(timeslot_params)
      if @timeslot.save
        redirect_to property_path(@property), notice: 'Timeslot was successfully created.'
      else
        render :new, status: :unprocessable_entity
      end
    else
      @timeslot = Timeslot.new(timeslot_params)
      @timeslot.errors.add(:base, "Property not found")
      render :new, status: :unprocessable_entity
    end
  end

  def show
    redirect_to timeslots_path
  end

  private

  def timeslot_params
    params.require(:timeslot).permit(:viewing_date, :start_time, :end_time, :max_guests, :property_id)
  end
end
