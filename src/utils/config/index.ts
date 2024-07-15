const _ = (key: string) => {
  return import.meta.env[key] || "";
};

const config = {
  apiBaseUrl: _("VITE_API_BASE_URL"),
};

export default config;
