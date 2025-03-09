export const EMAIL_VALIDATION = {
    required: 'email is required',
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
    }
}
export const PASSWORD_VALIDATION =
{
    required: 'password is required',
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Must be 6+ chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char",
    }
}
export const OTP_VALIDATION =
{
    required: 'OTP is required',
}
export const CONFIRM_PASS_VALIDATION = (password) => (
{
    required: 'Confirm Password is required',
    validate: value => value === password || 'Passwords do not match'
  })

