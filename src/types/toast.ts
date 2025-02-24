export interface IToast {
  type: "error" | "success" | "warning" | "info" | "password" | undefined;
  title: string;
  description: string;
  timeout?: number;
}
