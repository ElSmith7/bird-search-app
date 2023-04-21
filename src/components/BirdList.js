import Loader from "./Loader";
import Panel from "./Panel";
import { useFetchBirdsQuery } from "../store";
import Bird from "./Bird";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <Panel>Error Loading birds...</Panel>;
  } else {
    content = data.map((bird) => {
      return <Bird key={bird.id} bird={bird} />;
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">{content}</div>
  );
}

export default BirdList;
