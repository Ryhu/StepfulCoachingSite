class Student < ApplicationRecord
    include ActiveModel::Serialization
    
    has_many :lessons
end
