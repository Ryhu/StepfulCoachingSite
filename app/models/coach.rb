class Coach < ApplicationRecord
    include ActiveModel::Serialization
    
    has_many :lessons
end
