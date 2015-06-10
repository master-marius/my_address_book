class SignupController < ApplicationController
  layout "signup_form"
  def index
    @user = User.all
  end

  def create
    @user = User.create(user_params).errors
   
    if @user.messages.empty?
      flash[:info] = "Successfully Signed up"
      redirect_to login_path
    else
      flash[:danger] = @user.messages;
      render action: 'index'
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname,:lastname,:middlename,:username,:email, :password, :password_confirmation)
  end

end