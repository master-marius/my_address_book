class CreateTableAddressBook < ActiveRecord::Migration
  def change
    create_table :address_book do |t|
        t.integer :contact_id
        t.integer :user_id
        
        t.timestamps
    end
  end
end
