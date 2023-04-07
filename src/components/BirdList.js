import BeatLoader from "react-spinners/BeatLoader";
import Panel from "./Panel";
import { useFetchBirdsQuery } from "../store";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();

  let content;

  if (isLoading) {
    content = <BeatLoader color="#36d7b7" />;
  } else if (error) {
    content = <Panel>Error Loading birds...</Panel>;
  } else {
    content = data.map((bird) => {
      return (
        <Panel key={bird.id}>
          <h4>{bird.name}</h4>
        </Panel>
      );
    });
  }

  return <div>{content}</div>;
}

export default BirdList;
