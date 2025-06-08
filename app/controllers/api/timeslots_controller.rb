module Api
  class TimeslotsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @timeslots = Timeslot.all
      render json: @timeslots
    end

    def new
      create
    end

    def create
      @property = Property.find(params[:property_id]) if params[:property_id].present?
      if @property
        @timeslot = @property.timeslots.build(timeslot_params)
        if @timeslot.save
          redirect_to api_property_path(@property), notice: 'Timeslot was successfully created.'
        else
          render :new, status: :unprocessable_entity
        end
      else
        @timeslot = Timeslot.new(timeslot_params)
        @timeslot.errors.add(:base, "Property not found")
        render :new, status: :unprocessable_entity
      end
    end

    def update
      timeslot = Timeslot.find(params[:id])

      if timeslot.update(timeslot_params)
        render json: { message: "Updated successfully", timeslot: timeslot }, status: :ok
      else
        render json: { errors: timeslot.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def timeslot_params
      params.require(:timeslot).permit(:status, :viewing_date, :start_time, :end_time, :max_guests, :property_id)
    end
  end
end
