import { useLocation } from "react-router-dom";

export function useQueryParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let params:Record<string, string> = {};

  for (let param of searchParams) {
    params[param[0]] = param[1];
  }

  return params;
}
