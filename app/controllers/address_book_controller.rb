class AddressBookController < AuthenticatedController
  # ...
  def index

  	@address_book = AddressBook.by(current_user.id).order('updated_at DESC')
  end

  def create
  	result = AddressBook.create_contacts(contact_params)
  
    if result[:success] 
      book = {
      :user_id => current_user.id, :contact_id => result[:contact].try(:id)
      }
      begin
        @address_book = AddressBook.create!(book)
        @contact = result[:contact]
      rescue ActiveRecord::RecordInvalid => invalid
        @error = true
        @message = invalid.record.errors
      end
    else
      @error = true
      @message = result[:message]
    end

  end

  def update
    @contact = Contact.find_by_id(contact_params[:id])
    @contact.update_attributes(contact_params)  
  end

  def destroy
    @address_book = AddressBook.find_by_id(params[:id])
    @address_book.destroy!
    contact_id = @address_book.contact.id
    contact = Contact.find_by_id(contact_id)
    contact.destroy
  end

  private

  def contact_params
  	params.require(:contact).permit(:id,:fullname, :address, :contact_number)
  end

  def book_params
    params.require(:address_book).permit(:contact_id, :user_id)
  end
end