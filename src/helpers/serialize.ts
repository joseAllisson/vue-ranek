import type { LocationQuery } from "vue-router";

// interface QueryParams {
//   [key: string]: string;
// }

export function serialize(obj: LocationQuery) {
  let queryString = "";
  for (const key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }
  return queryString;
}
