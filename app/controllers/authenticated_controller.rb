class AuthenticatedController < ApplicationController
  before_filter :require_login

  def is_login
    if !current_users.empty?
      response = {:success => true, :messages => "", :data => []}
      render :json => response
      return
    end
  end

  protected
  def not_authenticated
    flash[:warning] = 'Login to proceed'
    redirect_to login_url, :_method => 'get'
  end

end