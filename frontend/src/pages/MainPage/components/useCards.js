import { useEffect, useState } from "react";
// import axios from "axios";
import { getMainProjects } from "../../../api/common";

// const card = {
//   id: null,
//   projectReqDto: {
//     category: null,
//     subject: null,
//     description: null,
//     pointPerMoi: null,
//   },
//   donationResDto: {
//     startDate: null,
//     endDate: null,
//     targetAmount: null,
//     subject: null,
//     description: null,
//     id: null,
//     amount: null,
//   },
// };
const useCards = () => {
  // -- 이은혁
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getProjects = async () => {
    try {
      await getMainProjects().then((data) => {
        console.log(data);
        setCards(data);
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return { cards, isLoading, error };
};

export default useCards;
