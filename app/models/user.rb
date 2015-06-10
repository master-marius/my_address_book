class User < ActiveRecord::Base
  authenticates_with_sorcery!
  validates :password, length: { minimum: 4 }
  validates :password, confirmation: true

  validates :email, uniqueness: true
  validates :email, presence: true
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
end
