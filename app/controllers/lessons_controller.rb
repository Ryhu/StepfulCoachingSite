class LessonsController < ApplicationController
  def index
    lessons = Lesson.where(studentId: nil)
    if lessons
      render json: lessons, each_serializer: LessonSerializer
    else
      render json: lessons.errors
    end
  end
  
  def create
    lesson = Lesson.create!(lesson_params)
    if lesson
      render json: lesson
    else
      render json: lesson.errors
    end
  end

  def update
    lesson = Lesson.find(params[:lesson][:id])

    if lesson.update!({notes: params[:lesson][:notes], score: params[:lesson][:score]})
      render json: lesson
    else
      render json: lesson.errors
    end
  end

  def enroll
    lesson = Lesson.find(params[:lesson][:id])

    if lesson.update!({studentId: params[:lesson][:studentId]})
      render json: lesson
    else
      render json: lesson.errors
    end
  end

  def show
  end

  def destroy
  end

  private

  def lesson_params
    params.permit(:id, :title, :description, :notes, :score, :coachId, :studentId, :date, :time, :lesson)
  end
end
