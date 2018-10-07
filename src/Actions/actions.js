export const getCurrentUser = current_user => ({
  type: "CURRENT_USER",
  current_user
});

export const getAuthStatus = auth_status => ({
  type: "AUTHENTICATED",
  auth_status
});
