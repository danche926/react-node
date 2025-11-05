// src/hooks/useFetch.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

/**
 * useFetch - 通用数据请求 Hook
 * @param {string} url 请求地址
 * @param {object} options axios配置项
 * @param {array} deps 依赖数组，改变时会重新请求
 */
export function useFetch(url, options = {}, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios({
        method: "get",
        url,
        ...options,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, deps.length ? deps : [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
