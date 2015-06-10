class UsersController < AuthenticatedController
  # ...

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end