import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import point01 from "../../assets/img/point01.png";
import point02 from "../../assets/img/point02.png";

const PointPage = () => {
  const [currentPoint, setCurrentPoint] = useState(0);
  const donate = async (price) => {
    setCurrentPoint(currentPoint + price);
  };

  const [kakaoUrl, SetKakaoUrl] = useState("");
  useEffect(() => {
    if (currentPoint !== 0) {
      axios({
        url: "https://kapi.kakao.com/v1/payment/ready",
        method: "POST",
        headers: {
          Authorization: "KakaoAK 75072266177df82ab4bc1574f658a897",
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        next_redirect_pc_url: "",
        tid: "",
        params: {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          item_name: "모이다 기부포인트",
          quantity: 1,
          total_amount: currentPoint,
          tax_free_amount: 0,
          vat_amount: 200,
          approval_url: "http://localhost:3000/payresult",
          fail_url: "http://localhost:3000/payresult",
          cancel_url: "http://localhost:3000/payresult",
        },
      })
        .then((res) => {
          console.log(res.data.next_redirect_pc_url);
          window.localStorage.setItem("tid", res.data.tid);
          SetKakaoUrl(res.data.next_redirect_pc_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentPoint]);

  const kakaoPay = () => {
    if (kakaoUrl === "") {
      alert("1000원 이상 결제만 가능합니다.");
    } else {
      SetKakaoUrl("");
      setCurrentPoint(0);
      window.open(kakaoUrl);
      // 자식창에서 버튼 눌렀을 때 동작
      window.parentCallback = (page) => {
        try {
          window.open("about:blank", "_self").self.close();
        } catch {
          console.log("");
        }
      };
    }
  };

  return (
    <PointContainer>
      <LeftSide>
        <div>
          <img className="h-auto max-w-full rounded-lg" src={point02} alt="" />
        </div>
      </LeftSide>
      <RightSide>
        <PointForm>
          <Title>충전할 금액 설정</Title>
          <InnerBox>
            <Text>충전 금액</Text>
            <PointText>{currentPoint}</PointText>
          </InnerBox>
          <InnerBox>
            <Text>VAT (10%)</Text>
            <PointText>{parseInt(currentPoint / 10)}</PointText>
          </InnerBox>
          <GroupButton>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                setCurrentPoint(0);
                SetKakaoUrl("");
              }}
            >
              <Text>초기화</Text>
            </PointButton>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(50000);
              }}
            >
              <Text>+50,000</Text>
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(10000);
              }}
            >
              <Text>+10,000</Text>
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(5000);
              }}
            >
              <Text>+5,000</Text>
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(1000);
              }}
            >
              <Text>+1,000</Text>
            </PointButton>
          </GroupButton>
          <Line></Line>
          <Title>최종 결제 금액</Title>
          <Box>
            <KakaoBox>
              <Text>간편결제</Text>
              <PointText>카카오페이</PointText>
            </KakaoBox>
            <div>
              <PayText>{parseInt(currentPoint * 1.1)} 원</PayText>
              <PayTextBottom>(VAT 포함)</PayTextBottom>
            </div>
          </Box>
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              kakaoPay();
            }}
          >
            결제하기
          </SubmitButton>
          <ImageBox>
            <img
              className="h-auto max-w-full rounded-lg"
              src={point01}
              alt=""
            />
          </ImageBox>
        </PointForm>
      </RightSide>
    </PointContainer>
  );
};

const PointContainer = styled.div`
  ${tw`
  mx-auto max-w-4xl px-4 pt-40 pb-16
  grid grid-cols-2
  `}
`;

const Title = styled.h2`
  ${tw`
  text-left	text-lg font-black text-gray-900 mb-3
  `}
`;

const LeftSide = styled.div`
  ${tw`
  row-span-3  flex items-center justify-between pr-20
`}
`;

const RightSide = styled.div`
  ${tw`
  mt-4 row-span-3 lg:mt-0
`}
`;

const InnerBox = styled.div`
  ${tw`
flex items-center justify-between
`}
`;

const Box = styled.div`
  ${tw`
  grid grid-cols-2 bg-slate-100 h-20
  flex items-center justify-between 
`}
`;

const ImageBox = styled.div`
  ${tw`
  m-3
`}
`;

const KakaoBox = styled.div`
  ${tw`
  text-left pl-5
  `}
`;

const PointForm = styled.form`
  ${tw`
  mt-10
`}
`;

const GroupButton = styled.div`
  ${tw`
  grid grid-cols-5 gap-1 mt-5 
  `}
`;

const PointButton = styled.button`
  ${tw`
  border hover:bg-sky-500 active:bg-sky-600
  `}
`;

const Text = styled.h3`
  ${tw`
  text-sm text-gray-600 font-extralight
  `}
`;

const PointText = styled.h3`
  ${tw`
  text-sm text-gray-900 font-bold	

  `}
`;

const PayText = styled.h3`
  ${tw`
  text-sm text-indigo-500 font-bold	
  `}
`;
const PayTextBottom = styled.h3`
  ${tw`
  text-sm text-gray-600 font-extralight
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  bg-sky-600 w-full h-full mt-3 py-3 px-10 font-light text-white
  `}
`;
const Line = styled.hr`
  ${tw`
  my-10
  `}
`;

export default PointPage;
