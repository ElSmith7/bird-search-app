import Panel from "./Panel";
import { useFetchBirdsQuery } from "../store";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();

  return (
    <div>
      <Panel>Bird List</Panel>
    </div>
  );
}

export default BirdList;
