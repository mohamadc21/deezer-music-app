import { Alert, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { genres } from '../constants';
import { useEffect, useState } from "react";
import Musics from "../components/Musics";
import Artists from "../components/Artists";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import Charts from "../components/Charts";
import SectionHeader from "../components/SectionHeader";
import { useGetSongsByGenreQuery } from "../app/api";
import { useDispatch, useSelector } from "react-redux";
import { hidePlayer, setData } from '../app/features/playerSlice';

const Discover = () => {

  const [currentGenre, setCurrentGenre] = useState(genres[0].value);
  const { musics, isPlaying, currentMusic, enabledItems } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetSongsByGenreQuery({ genre: currentGenre, limited: true });
  const redirect = useNavigate();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Discover';
    return () => {
      // dispatch(hidePlayer());
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setData({ data }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(hidePlayer());
  }, [currentGenre]);

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="info" />
      </div>
    )
  }

  if (error) {
    return <Alert severity="error">{typeof error === String ? error : 'an error occurred'}</Alert>
  }

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-24">
      <div className="flex-[2]">
        <SectionHeader>

          <SectionTitle>Discover &nbsp;"{genres.find(genre => genre.value === currentGenre)?.title || currentGenre}"&nbsp; genre</SectionTitle>
          <FormControl>
            <InputLabel id="label">Genre</InputLabel>
            <Select
              labelId="label"
              id="select"
              label="Genre"
              value={currentGenre}
              onChange={(e) => {
                setCurrentGenre(e.target.value);
                redirect(`?genre=${e.target.value}`)
              }}
            >
              <MenuItem value="">None</MenuItem>
              {genres.map(genre => (
                <MenuItem key={genre.value} value={genre.value}>{genre.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </SectionHeader>
        <Musics
          musics={musics}
          isPlaying={isPlaying}
          currentMusic={currentMusic}
          dispatch={dispatch}
          enabledItems={enabledItems}
        />
      </div>
      <div className="flex flex-col gap-12 flex-1">
        <Charts />
        <Artists />
      </div>
    </div>
  )
}

export default Discover