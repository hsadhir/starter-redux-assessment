import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  selectSuggestion,
} from "./suggestion.slice";
import "./suggestion.css";

function SuggestionContent({ loading, error, caption, imageUrl }) {
  return (
    <section className="suggestion-container">
      <h2>Suggestion of the Day</h2>
      {loading && <h3>Loading...</h3>}
      {error && <h3>Sorry, we're having trouble loading the suggestion.</h3>}
      <img alt={caption} src={imageUrl} />
      <p>{imageUrl}</p>
    </section>
  );
}

export default function Suggestion() {
  const { caption, imageUrl } = useSelector(selectSuggestion);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      dispatch(fetchSuggestion());
    }
    loadSuggestion();
  }, [dispatch]);

  return <SuggestionContent loading={loading} error={error} caption={caption} imageUrl={imageUrl}/>;
}
