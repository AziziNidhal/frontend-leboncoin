import { useCallback, useState } from "react";

import RequestConfig from './../types/RequestConfig';

const useHttp = (token?:string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = useCallback(
    async (request: RequestConfig, afterRequest: (data: any) => void,afterError: (data: any) => void) => {
      setIsLoading(true);
      setError(null);
      try {
        var response = await fetch(request.url, {
          method: request.method ? request.method : "GET",
          body: request.body ? request.body : null,
          headers : {
            Authorization:token?`Bearer ${token}`:''
          }
        });

        if (!response.ok) {
          throw new Error(`An Error! Code: ${response.status}`);
        }

        const data = await response.json();
        afterRequest(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);

            afterError(err);
        }
      }

      setIsLoading(false);
    },
    []
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
