class ContactsController < AuthenticatedController
  
  def update
  @contact = Contact.find_by_id(params[:id])
  
  fullname = contact_params[:fullname]

  contact = Contact.where(["fullname = :fullname and id <> :id", { fullname: fullname, id: @contact.id }])
    if contact.nil? || contact.empty?
      begin
          @contact.update_attributes!(contact_params)
      rescue ActiveRecord::RecordInvalid => invalid
          @error = true
          @message = invalid.record.errors
      end
    else
      @error = true
      @message = {:fullname => ["has already been taken"] }
    end	
  	
  end

  private

  def contact_params
    params.require(:contact).permit(:id,:fullname, :address, :contact_number, :created_at, :updated_at)
  end
end