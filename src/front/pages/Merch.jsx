import React, { useEffect, useState } from "react";
import projectimage1 from "../assets/img/projectimage1.png";

export const Merch = () => {
  // Manual vintage videos with YouTube IDs
  const vintageVideos = [
  { name: "Super Mario Bros.", youtubeId: "ia8bhFoqkVE" },
  { name: "The Legend of Zelda", youtubeId: "1rPxiXXxftE" },
  { name: "Super Mario Bros.", youtubeId: "NTa6Xbzfq1U" }, 
  { name: "Pac-Man", youtubeId: "QpKkApf-7Z0" },
  { name: "Super Mario Bros.", youtubeId: "RndsgsnvarA" },
  { name: "Tetris", youtubeId: "Ino2s8eEAyQ" },  
    // add more manually here as needed
  ];

  const [modernVideos, setModernVideos] = useState([]);
  const [loadingMoreModern, setLoadingMoreModern] = useState(false);
  const [modernPage, setModernPage] = useState(1);

  const RAWG_KEY = "e09cf7c5817241ee825687b3373f921f";
  const MODERN_PAGE_SIZE = 20;

  const fetchModernTrailers = async (page) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${RAWG_KEY}&page=${page}&page_size=${MODERN_PAGE_SIZE}`
      );
      const data = await response.json();

      const trailerPromises = data.results.map(async (game) => {
        try {
          const movieRes = await fetch(
            `https://api.rawg.io/api/games/${game.slug}/movies?key=${RAWG_KEY}`
          );
          const movieData = await movieRes.json();
          const trailer = movieData.results?.[0];
          if (trailer?.data?.max) {
            return {
              name: game.name,
              video: trailer.data.max,
            };
          }
        } catch (err) {
          console.error("Error fetching trailer for", game.name, err);
        }
        return null;
      });

      const trailers = await Promise.all(trailerPromises);
      return trailers.filter((t) => t !== null);
    } catch (error) {
      console.error("Error fetching modern trailers:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialTrailers = async () => {
      const initialTrailers = await fetchModernTrailers(1);
      setModernVideos(initialTrailers);
    };
    loadInitialTrailers();
  }, []);

  const loadMoreModernTrailers = async () => {
    setLoadingMoreModern(true);
    const nextPage = modernPage + 1;
    const moreTrailers = await fetchModernTrailers(nextPage);
    setModernVideos((prev) => [...prev, ...moreTrailers]);
    setModernPage(nextPage);
    setLoadingMoreModern(false);
  };

  return (
        <div
          className="d-flex justify-content-center"
          style={{
            backgroundImage: `url(${projectimage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          
            width: "100vw",
          }}
        >
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">🎬 Gameplay Showcase</h1>

      {/* Vintage Gameplays */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🎮 Vintage Gameplays</h2>
        {vintageVideos.length === 0 ? (
          <p className="text-center text-gray-500">No vintage videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vintageVideos.map((video, index) => (
              <div key={index} className="shadow-lg p-4 bg-white rounded-xl">
                <h3 className="font-semibold mb-2">{video.name}</h3>
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.name}
                  width="100%"
                  height="200%"
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modern Game Trailers */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🕹️ Modern Game Trailers (RAWG)</h2>
        {modernVideos.length === 0 ? (
          <p className="text-center text-gray-500">No modern videos found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {modernVideos.map((video, index) => (
                <div key={index} className="shadow-lg p-4 bg-white rounded-xl">
                  <h3 className="font-semibold mb-2">{video.name}</h3>
                  <video controls width="100%" preload="metadata">
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={loadMoreModernTrailers}
                disabled={loadingMoreModern}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingMoreModern ? "Loading..." : "Load More Trailers"}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
    </div>
  );
};
