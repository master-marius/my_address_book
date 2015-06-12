if @error == true
	json.message @message
	json.success false
else
	json.id @address_book.try(:id)
	json.contact @contact
	json.success true
	json.message "Added Succefully!!"
end