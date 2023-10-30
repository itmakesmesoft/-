import Projects from "./components/Projects";
import Intro from "./components/Intro";
import Nft from "./components/Nft";
// import Footer from "../../components/Footer/Index";
import styled from "styled-components";
// import { useEffect } from "react";
import useCards from "./components/useCards";

const MainPage = () => {
  const { cards, isLoading } = useCards([]);

  return (
    <Wrapper>
      <Intro />
      <div>
        {isLoading && <div>불러오고 있어요!</div>}
        {!isLoading &&
          cards?.map((card, index) => (
            <Projects card={card} index={index} key={index}></Projects>
          ))}
      </div>
      <Nft />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: #fafaf3;
`;

export default MainPage;
