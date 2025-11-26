export function getBaseUrl(subDestination: string) {
  const url =
    import.meta.env.VITE_API_MODE === "development"
      ? import.meta.env.VITE_API_LOCAL_MEDIA_URL
      : import.meta.env.VITE_API_SERVER_MEDIA_URL;
  return `${url}/${subDestination}`;
}
