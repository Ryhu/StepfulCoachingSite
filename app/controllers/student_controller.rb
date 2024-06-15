class StudentController < ApplicationController
  def index
  end

  def create
  end

  def lessons
    lessons = Lesson.where(studentId: student_params[:id])
    render json: lessons, each_serializer: LessonSerializer
  end

  def destroy
  end

  private

  def student_params
    params.permit(:firstName, :lastName, :id, :phone)
  end
end
