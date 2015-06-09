class AddAttributesToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string, :default => nil
  	add_column :users, :firstname, :string, :default => nil
  	add_column :users, :lastname, :string, :default => nil
  	add_column :users, :middlename, :string, :default => nil
  end
end
