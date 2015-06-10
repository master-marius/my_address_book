class CreateTableContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
        t.string :fullname
        t.string :address
        t.string :contact_number
        
        t.timestamps
    end
  end
end
