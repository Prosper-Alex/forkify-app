import { useEffect, useRef, useState, useCallback } from "react";

export default function useApi(
  fetcher,
  deps = [],
  options = { immediate: true },
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(options.immediate));
  const controllerRef = useRef(null);
  const mountedRef = useRef(false);

  const run = useCallback(
    async (overrideDeps) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher(controller.signal, overrideDeps);
        if (!mountedRef.current) return;
        setData(result);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [fetcher],
  );

  useEffect(() => {
    mountedRef.current = true;
    if (options.immediate) run();
    return () => {
      mountedRef.current = false;
      if (controllerRef.current) controllerRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data,
    error,
    loading,
    refetch: run,
  };
}
