import BeatLoader from "react-spinners/BeatLoader";
import Panel from "./Panel";
import { useFetchBirdsQuery } from "../store";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();

  let content;

  if (isLoading) {
    content = <BeatLoader data-testid="loader" color="#36d7b7" />;
  } else if (error) {
    content = <Panel>Error Loading birds...</Panel>;
  } else {
    content = data.map((bird) => {
      return (
        <Panel data-testid="bird" key={bird.id}>
          <h4>
            {bird.name}
            {bird.number}
          </h4>
        </Panel>
      );
    });
  }

  return <div>{content}</div>;
}

export default BirdList;
