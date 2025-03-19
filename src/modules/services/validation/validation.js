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

export const CATEGORY_VALIDATION =
{
    required: 'Name is required',
}
export const REQUIRED_VALIDATION = (INPUT) => (
    {
        required: `${INPUT} is required`,
    })
export const USERNAME_VALIDATION = {
    required: 'Username is required',
    pattern: {
        value: /^(?=.*[A-Za-z])[A-Za-z0-9]{3,7}[0-9]$/,
        message: 'Must be 4–8 chars, include letters, and end with numbers.',
    },
};
export const COUNTRY_VALIDATION =
{
    required: 'COUNTRY is required',
    pattern: {
        value: /^[a-zA-Z]{2,}$/,
        message: "enter a valid country",
    }
}
export const PHONE_VALIDATION =
{
    required: 'Phone is required',
    pattern: {
        value: /^[0-9]{11}$/,
        message: "Invalid phone format",
    }
}