import { useEffect, useState } from "react";

function LinkPreview({ crystal }) {
  const { url } = crystal;
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(
          `http://localhost:5008/api/preview?url=${encodeURIComponent(url)}`
        );
        const data = await res.json();
        if (data && data.message === "Failed to fetch metadata") {
          setMeta(null);
        } else {
          setMeta(data);
        }
      } catch (err) {
        console.error("OG preview error:", err);
      }
    };

    fetchPreview();
  }, [url]);

  if (!meta)
    return (
      <a
        href={crystal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 shadow hover:shadow-lg transition"
      >
        <div className="p-4 bg-white dark:bg-gray-800">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {crystal.title}
          </h3>
          <span className="text-xs text-indigo-500">
            {new URL(crystal.url).hostname}
          </span>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Added by{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400 capitalize">
              {crystal.addedBy?.username || "Unknown"}
            </span>{" "}
            on {new Date(crystal.createdAt).toLocaleString()}
          </p>
        </div>
      </a>
    );

  return (
    <a
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 shadow hover:shadow-lg transition"
    >
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-50 object-contain"
        />
      )}
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {meta.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {meta.description}
        </p>
        <span className="text-xs text-indigo-500">
          {new URL(meta.url).hostname}
        </span>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Added by{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-400 capitalize">
            {crystal.addedBy?.username || "Unknown"}
          </span>{" "}
          on {new Date(crystal.createdAt).toLocaleString()}
        </p>
      </div>
    </a>
  );
}

export default LinkPreview;
