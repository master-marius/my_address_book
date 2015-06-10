class Contact < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :fullname, uniqueness: true
  validates :fullname, presence: true
  validates :address, presence:true
end
