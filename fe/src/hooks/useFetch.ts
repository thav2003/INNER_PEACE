/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";
import { formatError } from "~/api";
import { StringResponse } from "~/api/v1";
import { useAppStore } from "~/stores/app.store";

interface FetchFunctionObject<T> {
  fetchFunction: () => Promise<AxiosResponse<T>>;
}

const useFetch = <T>(
  { fetchFunction }: FetchFunctionObject<T>,
  ...args: any
): [T | null, boolean, string | null] => {
  const reFetch = useAppStore((state) => state.isRefecth);
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedFetchFunction = useCallback(fetchFunction, [...args]);

  useEffect(() => {
    setLoading(true);
    memoizedFetchFunction()
      .then((res: AxiosResponse) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(formatError(err));
        setLoading(false);
      });
  }, [memoizedFetchFunction, reFetch]);

  return [response as T, loading, error];
};

export default useFetch;
