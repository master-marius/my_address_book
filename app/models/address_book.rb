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
      fullname = contact_params[:fullname]
      contact = Contact.find_by_fullname(fullname)
      # binding.pry
      if contact.nil?
        begin
          create = Contact.create!(contact_params)
          result = { :success => true, :contact => create}
          return result
        rescue ActiveRecord::RecordInvalid => invalid
          result = { :success => false, :message => invalid.record.errors}
          return result
        end
      else
          error = {:fullname => ["has already been taken"] }
          result = { :success => false, :message => error}
      end		
  	end
  end
end
