interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "custom:user_id": string;
  "custom:firm_id": string;
  exp: number;
}

export type { JwtPayload };
