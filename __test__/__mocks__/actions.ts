export const mockUser = {
  id: "123",
  username: "Usuario",
  email: "usuario@example.com",
  role: "admin",
  image_url: "https://example.com/user.jpg",
};

export const mockSession = {
  userName: "Usuario",
  email: "usuario@example.com",
  role: "user",
  isLoggedIn: true,
  image_url: "https://example.com/user.jpg",
  userId: "user123",
};

export const validFormData = new FormData();
validFormData.append("email", "usuario@example.com");
validFormData.append("password", "usuario123");
