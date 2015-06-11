class ContactsController < AuthenticatedController
  # ...

  def update
  	@contact = Contact.find_by_id(params[:id])
  	
	begin
  		@contact.update_attributes!(contact_params)
	rescue ActiveRecord::RecordInvalid => invalid
  		@error = true
  		@message = invalid.record.errors
	end
  end

  private

  def contact_params
    params.require(:contact).permit(:id,:fullname, :address, :contact_number, :created_at, :updated_at)
  end
end