import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { fetchWithHeader } from "../utils/api";

export function RecommendationList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user: authUser } = useAuth();
  const userId = authUser?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchWithHeader(`/recommendations/user/${userId}?limit=4`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((text) => {
            throw new Error(`API Fout: Status ${r.status} - ${text}`);
          });
        }
        return r.json();
      })
      .then((data) => {
        setItems(data.items || []);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setError(error.message);
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, token]);

  const renderContent = () => {
    if (loading) return <p>Aanbevelingen laden...</p>;
    if (error) return <p style={{ color: "red" }}>Fout: {error}</p>;

    if (items.length > 0) {
      return (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.content._id || item.content.id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <div>
                <strong>{item.content.title}</strong>
                <span className="text-sm text-gray-500 ml-2">
                  (Match: {(item.score * 100).toFixed(0)}%)
                </span>
              </div>
              <Link
                to={`/aanvraag/stap-1?id=${item.content._id}&title=${encodeURIComponent(item.content.title)}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Aanvragen
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return <p>Geen aanbevelingen gevonden op dit moment.</p>;
  };

  return (
    <div className="recommendations-container p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Aanbevolen voor jou</h2>
      {renderContent()}
    </div>
  );
}
