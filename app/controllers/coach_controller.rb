class CoachController < ApplicationController
  def index
  end

  def create
  end

  def lessons
    lessons = Lesson.where(coachId: coach_params[:id])
    render json: lessons, each_serializer: LessonSerializer
  end

  def show
  end

  private

  def coach_params
    params.permit(:firstName, :lastName, :id, :title, :phone)
  end
end
