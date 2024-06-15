class StudentSerializer < ActiveModel::Serializer
  attributes :firstName, :lastName, :id, :phone
end
