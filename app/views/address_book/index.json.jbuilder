

json.address_book @address_book.each do |book|
	json.id book.id
	json.contact book.contact
end