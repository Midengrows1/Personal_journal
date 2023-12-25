import react from "react";
import { useParams } from "react-router-dom";
const Removal = () => {
  const memoryId = useParams();
  console.log(memoryId);
  return (
    <div>
      <h1>Removal</h1>
    </div>
  );
};

export default Removal;
