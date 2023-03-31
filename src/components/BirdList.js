import { useEffect } from "react";
import { useFetchBirdsQuery } from "../store";

function BirdList() {
  const { data, error, isLoading } = useFetchBirdsQuery();
  console.log(data, error, isLoading);
  useEffect(() => {}, []);
  return <div>Bird List</div>;
}

export default BirdList;
