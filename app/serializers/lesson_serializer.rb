class LessonSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :notes, :score, :coachId, :studentId, :date, :time

  belongs_to :coach
  belongs_to :student, optional: true
end
