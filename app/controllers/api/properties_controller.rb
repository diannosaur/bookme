module Api
  class PropertiesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create, :show]


    def index
      @properties = Property.all
      render json: @properties.to_json()
    end

    def create
      @property = Property.new(property_params)
      if @property.save
        render json: @property.to_json(), status: :created
      else
        render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def show
      property = Property.includes(:timeslots).find(params[:id])
      render json: property.to_json(include: :timeslots)
    end

    private

    def property_params
      params.require(:property).permit(:name, :address)
    end
  end
end
