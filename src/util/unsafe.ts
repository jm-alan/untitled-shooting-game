export const cast = <To, From = unknown>(f: From): To => f as unknown as To;
