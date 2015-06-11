class AddressBook < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :user_id, presence: true
  validates :contact_id, presence: true

  # ------------------------------------------
  # S C O P E S
  # ------------------------------------------
  scope :by, lambda { |user_id| where(:user_id => user_id) }

  belongs_to :contact
  belongs_to :user
  # ------------------------------------------
  #  C L A S S  M E T H O D S
  # ------------------------------------------
  class << self
  	def create_contacts(contact_params)
  		self.transaction do 
  			contact = Contact.create!(contact_params)
  		end
  	end
  end
end
