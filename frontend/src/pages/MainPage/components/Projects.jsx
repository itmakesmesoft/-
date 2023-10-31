import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useScroll from "./useScroll";
import "../main.css";
import 다람쥐_프로젝트 from "../img/다람쥐_프로젝트.webp";
import 야생동물_프로젝트 from "../img/야생동물_프로젝트.webp";
import 두루미_프로젝트 from "../img/두루미_프로젝트.webp";

const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Projects = (props) => {
  const { projectReqDto, donationResDto } = props.card; // props 데이터 - 이은혁
  const index = props.index; // props 데이터 - 이은혁

  // --------- 라우트 관련 - 이은혁
  const navigate = useNavigate();
  const clickCard = (routePath) => {
    navigate("/donation/" + routePath, { replace: false });
  };
  // -----------------------------
  console.log(props.card);
  let mainImg;
  if (projectReqDto.category === "CRANE") {
    mainImg = 두루미_프로젝트;
  } else if (projectReqDto.category === "SQUIRREL") {
    mainImg = 다람쥐_프로젝트;
  } else if (projectReqDto.category === "WILD_ANIMAL") {
    mainImg = 야생동물_프로젝트;
  }
  // --- 스크롤 이벤트 관련 - 이은혁
  const { ref: target, inView } = useScroll();
  // const [scrollY, setScrollY] = useState(); // scrollY: 스크롤량 저장

  const onScroll = () => {
    const value = window.scrollY;
    // setScrollY(parseInt(value));
    document.body.style.setProperty("--scroll", value / 1000);
  };

  useEffect(() => {
    if (inView) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [inView]);

  return (
    <StickyContainer ref={target}>
      <Sticky
        id={"card_" + index}
        className={inView ? "page card show" : "page card"}
      >
        <div className="inner_page">
          <Image width="700px" height="300px" src={mainImg} alt="" />
          <Subject category={projectReqDto.category}>
            {projectReqDto.subject}
          </Subject>
          <Content>
            <p id="desc">{projectReqDto.description}</p>
            {/* <p>모이 1개당 {projectReqDto.pointPerMoi} point</p> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "inline-block" }}>
                <p id="amount">
                  현재 {donationResDto.amount?.toLocaleString("ko-KR")} 원
                </p>
                <p id="target_amount">
                  목표 {donationResDto.targetAmount?.toLocaleString("ko-KR")} 원
                </p>
              </div>
              <div style={{ display: "inline-block" }}>
                <Button
                  category={projectReqDto.category}
                  onClick={() => clickCard(donationResDto.id)}
                >
                  참여하기
                </Button>
              </div>
            </div>
          </Content>
        </div>
      </Sticky>
    </StickyContainer>
  );
};

const StickyContainer = styled.div`
  height: 2000px;
  width: 100%;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
`;

const Image = styled.img`
  border-radius: 30px;
  object-fit: cover;
  background: #c2c2c2;
  margin-bottom: 25px;
  width: 700px;
  height: 300px;
`;

const Subject = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${(props) =>
    props.category === "WILD_ANIMAL" ? "rgba(210, 193, 0, 1)" : ""};
  color: ${(props) =>
    props.category === "CRANE" ? "rgba(23, 84, 102, 1)" : ""};
  color: ${(props) =>
    props.category === "SQUIRREL" ? "rgba(189, 120, 0, 1)" : ""};
  font-family: ${(props) =>
    props.category === "CRANE" ? "KyoboHandwriting2020A" : ""};
  font-family: ${(props) => (props.category === "SQUIRREL" ? "SBAggroB" : "")};
  font-family: ${(props) =>
    props.category === "WILD_ANIMAL" ? "Cafe24Ssurround" : ""};
`;

const Content = styled.div`
  width: 100%;
  text-align: left;
  & #desc {
    font-size: 1rem;
    color: #505050;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  & #amount {
    font-size: 1.2rem;
    font-weight: 900;
    color: #594949;
  }
  & #target_amount {
    font-size: 1.2rem;
    font-weight: 900;
    color: #6a6a6a;
  }
`;

const Button = styled.button`
  padding: 10px 40px;
  background-color: ${(props) =>
    props.category === "WILD_ANIMAL" ? "rgba(210, 193, 0, 1)" : ""};
  background-color: ${(props) =>
    props.category === "CRANE" ? "rgba(23, 84, 102, 1)" : ""};
  background-color: ${(props) =>
    props.category === "SQUIRREL" ? "rgba(189, 120, 0, 1)" : ""};
  color: white;
  font-weight: 700;
  border-radius: 5px;
  box-shadow: 0 5px 10px #00000040;

  &:hover {
    background-color: #87d636;
  }
  &:active {
    background-color: #87d636;
  }
`;
export default Projects;

// projectReqDto
// category: "WILD_ANIMAL"
// description: "옥수수는 많은 야생동물에게 도움이 됩니다~"
// pointPerMoi: 800
// subject: "야생동물에게 옥수수를 선물해주세요"

// donationResDto
// amount: 464800
// description: "프로젝트 기부 상세 설명~~"
// endDate: "2023-03-27T23:59:59.999999"
// id: 1
// startDate: "2023-03-24T00:00"
// subject: "프로젝트 기부 소제목"
// targetAmount: 3500000
