export type LoginDto = { email: string; password: string };

export type LoginResponse = { needs2FA: boolean; sessionId?: string };



export function mockLogin(data: LoginDto): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = data;
      if (email === "user@test.com" && password === "123") {
        resolve({ needs2FA: true, sessionId: "mock-session-123" });
      } else {
        reject(new Error("Неверный логин или пароль"));
      }
    }, 500);
  });
}
