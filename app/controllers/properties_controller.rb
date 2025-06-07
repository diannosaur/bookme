class PropertiesController < ApplicationController
  def new
    @property = Property.new
  end
  
  def index
    @properties = Property.all
  end

  def create
    @property = Property.new(property_params)
    if @property.save
      redirect_to properties_path, notice: 'Property was successfully created.'
    else
      render :new
    end
  end

  def show
    @property = Property.includes(:timeslots).find(params[:id])
  end

  private

  def property_params
    params.require(:property).permit(:name, :address, :price, :description)
  end
end
