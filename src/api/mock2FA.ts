export type PinResponse = { success: boolean };

export function mockVerify2FA(pin: string): Promise<PinResponse> {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (pin === "131311") {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid code"));
      }
  }, 500);
});}