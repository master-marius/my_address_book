class AddressBookController < AuthenticatedController
  # ...
  def index

  	@address_book = Contact.all()	
  end

  def create
  	@address_book = create!(book_params)	
  end

  private

  def book_params
    params.require(:book).permit(:contact_id, :user_id)
  end
end