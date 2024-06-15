class CoachSerializer < ActiveModel::Serializer
  attributes :firstName, :lastName, :id, :title, :phone, :introduction
end
