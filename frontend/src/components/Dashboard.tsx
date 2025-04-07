import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutWrapper from "../components/LayoutWrapper";
import LinkPreview from "./LinkPreview";

interface IHive {
  name: string;
  crystals: {
    _id: string;
    title: string;
    url: string;
    createdAt: string;
    addedBy: any;
  }[];
}

function Dashboard() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [hive, setHive] = useState<IHive>({ name: "", crystals: [] });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    const handlePaste = async (event: any) => {
      const pastedText = event.clipboardData.getData("text");

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = pastedText.match(urlRegex);

      if (!urls || urls.length === 0) return;

      const url = urls[0];
      console.log("📋 Pasted URL:", url);

      // Optional: Fetch page title via preview or just use domain
      const title = new URL(url).hostname;

      try {
        const response = await fetch(
          `http://localhost:5008/api/hive/${id}/crystals`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              crystals: [{ title, url }],
            }),
          }
        );

        if (response.ok) {
          console.log("✅ Crystal added from paste!");
          fetchHive();
        } else {
          console.error("❌ Failed to add pasted crystal");
        }
      } catch (err) {
        console.error("🔥 Error posting pasted crystal:", err);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [id, token]);

  const fetchHive = async () => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5008/api/hive/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch hive");

      const data = await res.json();
      setHive(data);
    } catch (err) {
      console.error("❌ Error loading hive:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHive();
  }, [id]);

  return (
    <LayoutWrapper>
      {id && (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {hive.name}
            </h2>

            <button
              onClick={() => {
                hive.crystals.forEach((crystal) => {
                  if (crystal.url) {
                    window.open(crystal.url, "_blank", "noopener,noreferrer");
                  }
                });
              }}
              className="text-sm px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
            >
              🔗 Open All
            </button>
          </div>

          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading hive...</p>
          ) : hive ? (
            <div className="grid">
              {hive.crystals && hive.crystals.length > 0 ? (
                <div className="grid gap-4">
                  {hive.crystals.map((crystal) => (
                    <div
                      key={crystal._id}
                      className="p-4 bg-white dark:bg-gray-800 rounded shadow text-sm text-gray-800 dark:text-gray-200"
                    >
                      <LinkPreview crystal={crystal} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No crystals found in this hive.
                </p>
              )}
            </div>
          ) : (
            <p className="text-red-500">Hive not found.</p>
          )}
        </>
      )}
    </LayoutWrapper>
  );
}

export default Dashboard;
