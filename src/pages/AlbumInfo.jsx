import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchAlbumData } from "../actions";
import AlbumItem from "../components/AlbumItem";
import Loader from "react-loader-spinner";

function AlbumInfo({ match }) {
  const [isLoading, setIsLoading] = useState(false);
  const [albumData, setAlbumData] = useState({
    albumInfo: {},
    artistInfo: {},
    tracks: [],
  });
  const getData = () => {
    setIsLoading(true);
    fetchAlbumData(match.params.id).then((response) => {
      if (!response.data.error) {
        setIsLoading(false);
        setAlbumData({
          albumInfo: response.data,
          artistInfo: response.data.artist,
          tracks: response.data.tracks.data,
        });
      } else {
        getData();
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return isLoading ? (
    <div className="contaier loader">
      <Loader type="Bars" color="#e57439" height={100} width={100} />
    </div>
  ) : (
    <>
      <Navbar
        isHome={false}
        isSingle={albumData.tracks.length > 1 ? true : false}
      />
      <AlbumItem
        src={albumData.albumInfo.cover_big}
        title={albumData.albumInfo.title}
        artist={albumData.artistInfo.name}
        date={albumData.albumInfo.release_date}
        tracks={albumData.tracks}
        isLoading={isLoading}
      />
    </>
  );
}

export default AlbumInfo;
