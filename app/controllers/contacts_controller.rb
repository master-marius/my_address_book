class ContactsController < AuthenticatedController
  # ...

  private

  def contact_params
    params.require(:contact).permit(:fullname, :address, :contact_number)
  end
end