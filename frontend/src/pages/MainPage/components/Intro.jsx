import styled from "styled-components";
import useScroll from "./useScroll";
import { useEffect } from "react";
import rabbit from "../img/토끼.webp";
import squirrel from "../img/다람쥐.webp";
import crane from "../img/흑두루미.webp";
import { useNavigate } from "react-router";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";

const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Intro = () => {
  const navigate = useNavigate();
  // --- 스크롤 이벤트 관련 - 이은혁
  const { ref: target, inView } = useScroll();
  // const scrollToPjt = () => {};
  // const [scrollY, setScrollY] = useState(); // scrollY: 스크롤량 저장
  const onScroll = () => {
    const value = window.scrollY;
    // setScrollY(parseInt(value));
    document.body.style.setProperty("--scroll", value / 1000);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <StickyContainer ref={target} className="page_container">
      <Sticky className={inView ? "page show intro" : "page"}>
        <div className="inner_page intro">
          <InlineBox>
            <WrapCircle>
              <Circle />
              <Circle />
              <Circle className="wrap_animal">
                <Img
                  src={rabbit}
                  width="125"
                  height="140"
                  className="rabbit"
                  alt=""
                />
              </Circle>
            </WrapCircle>
            <WrapCircle>
              <Circle />
              <Circle className="wrap_animal">
                <Img
                  src={crane}
                  width="125"
                  height="140"
                  className="crane"
                  alt=""
                />
              </Circle>
              <Circle />
            </WrapCircle>
            <WrapCircle>
              <Circle />
              <Circle />
              <Circle className="wrap_animal">
                <Img
                  src={squirrel}
                  width="125"
                  height="140"
                  className="squirrel"
                  alt=""
                />
              </Circle>
            </WrapCircle>
          </InlineBox>
          <TextBox>
            <Text>
              <H2 className="animation_h2">기부가, 마음이, 모두가</H2>
              <H1 className="animation_h1">모이다</H1>
              <H3 className="animation_h3">
                블록체인으로 연결된 야생동물 상생 플랫폼
                <br />
                야생동물의 보호와 함께 지속 가능한 발전을 추구하는
                <br />
                우리의 노력에 함께해주세요
                <br />
              </H3>
            </Text>
            <Button onClick={() => navigate("/donation")}>함께하기</Button>
          </TextBox>
        </div>
        <Arrow
          onClick={() => window.scrollTo({ top: 2500, behavior: "smooth" })}
        >
          <IoIosArrowDown size="1.5rem" color="#959595" />
        </Arrow>
      </Sticky>
    </StickyContainer>
  );
};

const StickyContainer = styled.div`
  height: 1900px;
  width: 100%;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
  color: black;
`;

const WrapCircle = styled.div`
  display: flex;
  flex-direction: row;
`;

const Circle = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 100px;
  background-color: #e1edd5;
  margin: 10px;
`;

const Img = styled.img`
  object-fit: cover;
  width: 125px;
  height: 140px;
`;

const InlineBox = styled.div`
  display: inline-block;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const Text = styled.div`
  text-align: right;
  display: inline-block;
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 100;
  line-height: 3.5rem;
  color: #584e3f;
`;
const H1 = styled.h1`
  color: rgb(131, 189, 0);
  font-size: 5rem;
  font-weight: 600;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  letter-spacing: -6.5px;
`;
const H3 = styled.h3`
  font-size: 0.95rem;
  color: #584e3f;
`;

const Button = styled.button`
  padding: 7px 45px;
  border-radius: 5px;
  background-color: #dc653f;
  color: white;
  margin-bottom: 3rem;
  &:hover {
    background-color: #f3825e;
  }
  &:active {
    background-color: #dc653f;
  }
`;
const Arrow = styled.div`
  color: rgb(149, 149, 149);
  border-radius: 50px;
  border: 3px solid #959595;
  padding: 7px;
  cursor: pointer;
  &:hover {
    background: #e2ffa2;
  }
  &:active {
    background: #cde695;
  }
`;
export default Intro;
