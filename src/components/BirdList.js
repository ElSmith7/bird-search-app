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
      return <Bird bird={bird} />;
    });
  }

  return <div>{content}</div>;
}

export default BirdList;
