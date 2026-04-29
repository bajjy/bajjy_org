// Tiny fetch wrapper. Returns reactive { data, error, loading } refs.

import { ref, onMounted } from 'vue';

export function useFetch(url, opts = {}) {
  const data = ref(opts.initial ?? null);
  const error = ref(null);
  const loading = ref(true);

  const run = async (overrideUrl) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(overrideUrl || url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      data.value = await res.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  if (opts.immediate !== false) onMounted(run);

  return { data, error, loading, run };
}
