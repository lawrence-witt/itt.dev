import React from "react";

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API;

export const useStrapiApi = (): ((s: string) => string) => {
  const asEndpoint = React.useCallback((s: string) => STRAPI_API.concat(s), []);

  return asEndpoint;
};
