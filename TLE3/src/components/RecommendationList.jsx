import { useEffect, useState } from "react";
import {useAuth} from "../auth/AuthContext.jsx";
import { fetchWithHeader } from "../utils/api";



export function RecommendationList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,  setError] = useState(null);
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
          Authorization: `Bearer ${token}`
      },
    })
        .then((r) => {
          if (!r.ok) {
            return r.text().then(text => {
              throw new Error(`API Fout: Status ${r.status} - ${text}`);
            });
          }
          return r.json();
        })
        .then((data) => {
          // De API geeft een lijst met 'items' terug die elk een 'content' object hebben
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
                <li key={item.content._id || item.content.id} className="border-b pb-2">
                  <strong>{item.content.title}</strong>
                    <strong>{item.reason.preferred_categories}</strong>
                  <span className="text-sm text-gray-500 ml-2">
                (Match: {(item.score * 100).toFixed(0)}%)
              </span>
                  {/*{item.content.body && <p className="text-sm">{item.content.body}</p>}*/}
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
