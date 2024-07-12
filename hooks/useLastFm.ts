import axios from "axios";

export const useLastFM = () => {
  const APP_NAME = "Ideact Test";
  const API_KEY = "c19c47264b0dfd0973d63aa54cb6788c";
  const SHARED_SECRET = "9a3d52e98a4c4586759967697e6e5de1";
  const REGISTERED_TO = "restrada4017";
  const URL = "https://ws.audioscrobbler.com/2.0/";

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get(URL, {
        params: {
          method: "geo.gettoptracks",
          country: "spain",
          api_key: API_KEY,
          format: "json",
        },
      });
      return response.data.tracks.track;
    } catch (error) {
      console.log("top track's error: ", error);
    }
  };

  const fetchTrack = async (artist: string, track: string) => {
    try {
      const response = await axios.get(URL, {
        params: {
          method: "track.getInfo",
          country: "spain",
          api_key: API_KEY,
          artist,
          track,
          format: "json",
        },
      });
      return response.data.track;
    } catch (error) {
      console.log("top track's error: ", error);
    }
  };

  return {
    fetchTopTracks,
    fetchTrack,
  };
};
