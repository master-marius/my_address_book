if @error == true
	json.message @message
	json.success false
else
	json.contact @contact
	json.success true
end