import { useSelector } from "react-redux";
import { useFetchBirdsQuery } from "../store";
import Loader from "./Loader";
import Panel from "./Panel";
import Bird from "./Bird";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();
  const { name } = useSelector((state) => state.search);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <Panel error>Error Loading birds...</Panel>;
  } else {
    content = data
      .filter((bird) => {
        return bird.name.includes(name);
      })
      .map((bird) => {
        return <Bird key={bird.id} bird={bird} />;
      });
  }

  return (
    <div className="flex flex-col items-center justify-center">{content}</div>
  );
}

export default BirdList;
