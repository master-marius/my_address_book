class AddressBookController < AuthenticatedController
  # ...
  def index

  	@address_book = AddressBook.by(current_user.id).order('updated_at DESC')
  end

  def create
  	@contact = AddressBook.create_contacts(contact_params)
  		book = {
  			:user_id => current_user.id, :contact_id => @contact.id
  		}
  	@address_book = AddressBook.create!(book)
  end

  def update
    @contact = Contact.find_by_id(contact_params[:id])
    binding.pry
    @contact.update_attributes(contact_params)  
  end

  private

  def contact_params
  	params.require(:contact).permit(:id,:fullname, :address, :contact_number)
  end

  def book_params
    params.require(:address_book).permit(:contact_id, :user_id)
  end
end