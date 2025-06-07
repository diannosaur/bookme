module Api
  class PropertiesController < ApplicationController
    def show
      property = Property.includes(:timeslots).find(params[:id])
      render json: property.to_json(include: :timeslots)
    end
  end
end
