import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3310/api/programs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des programmes.");
        }
        return response.json();
      })
      .then((data: Program[]) => {
        setPrograms(data);
      })
      .catch((err) => {
        setError((err as Error).message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des séries...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des Séries</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {programs.map((program) => (
          <div
            key={program.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={program.poster}
              alt={program.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h2>{program.title}</h2>
            <p>
              <strong>Pays :</strong> {program.country}
            </p>
            <p>
              <strong>Année :</strong> {program.year}
            </p>
            <p style={{ fontSize: "12px" }}>{program.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
