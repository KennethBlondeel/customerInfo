export const updateLang = (id) => ({
  type: "UPDATE_LANG",
  id,
});

export const updateCurrentEstablishment = (establishment) => ({
  type: "UPDATE_CURRENT_ESTABLISHMENT",
  establishment,
});

export const updateCorrectOTP = (value) => ({
  type: "UPDATE_CORRECT_OTP",
  value,
});

export const updateEmail = (value) => ({
  type: "UPDATE_EMAIL",
  value,
});

export const updatePassword = (value) => ({
  type: "UPDATE_PASSWORD",
  value,
});
