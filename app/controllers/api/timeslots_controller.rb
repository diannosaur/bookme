module Api
  class TimeslotsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      @timeslots = Timeslot.all
      render json: @timeslots
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
      params.require(:timeslot).permit(:status)
    end
  end
end
