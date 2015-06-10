class UsersSessionController < ApplicationController
  layout "session"
  def new
    @user = User.new
  end

  def create
    if @user = login(params[:username], params[:password])
      redirect_back_or_to(:root, notice: 'Login successful')
    else
      flash.now[:danger] = 'Login failed'
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_back_or_to(:root, notice: 'Logout successful')
  end
end