type RequestConfig =
  | { url: string; method?: "GET"; body: null }
  | { url: string; method: "POST"; body?: string|FormData }
  | { url: string; method: "PUT"; body?: string|FormData }
  | { url: string; method: "DELETE"; body?: string|FormData };

export default RequestConfig;
