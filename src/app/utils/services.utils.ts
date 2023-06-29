import { DecodedToken } from '../models/api.model';

export function decodeToken(token: string): DecodedToken {
  const _decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return;
    }
  };

  const decodedToken: DecodedToken = token
    .split('.')
    .map((token) => _decodeToken(token))
    .reduce((acc, curr) => {
      if (!!curr) acc = { ...acc, ...curr };
      return acc;
    }, Object.create(null));

  const expirationDateUTC = extractExpirationDate(decodedToken);
  const expirationDateFR = new Date(expirationDateUTC).toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
  });

  return { ...decodedToken, expirationDateUTC, expirationDateFR };
}

export function extractExpirationDate(decodedToken: DecodedToken): string {
  return new Date(decodedToken.exp * 1000).toISOString();
}

export function getExpirationDate(token: string): Date {
  const expired = new Date(0);

  if (!token) {
    return expired;
  }

  const decodedToken = decodeToken(token);
  if (!decodedToken.exp) {
    return expired;
  }

  return new Date(decodedToken.exp * 1000);
}

//   export function isTokenExpired(expirationDate: Date): boolean {
//     const now = new Date();
//     return now < expirationDate;
//   }

//   export function isValidToken(token: string): boolean {
//     if(!token) {
//         console.log("isValidToken: empty token");
//         return false;
//     }

//     const decodedToken = decodeToken(token);
//     if(!decodedToken.exp) {
//         console.log("isValidToken: token without exp defined");
//         return false;
//     }

//     const expirationDate = new Date(decodedToken.exp * 1000);
//     const now = new Date();
//     console.log(expirationDate);
//     console.log(now);
//     console.log("now < expirationDate < now: " + (now < expirationDate));
//     return now < expirationDate;
//   }
