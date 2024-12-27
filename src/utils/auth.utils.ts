export type JwtPayload = {
  sub: string;
  email?: string | null;
  phoneNo?: string | null;
  username: string;
};
