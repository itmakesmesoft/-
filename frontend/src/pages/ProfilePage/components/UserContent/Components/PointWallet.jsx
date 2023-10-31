import React, { useState, useEffect } from "react";
import Paging from "../../../../../components/Pagination/Paging";
import { HiOutlineTicket } from "@react-icons/all-files/hi/HiOutlineTicket";
import badge_charge from "../../../../../assets/img/badge_charge.png";
import badge_donation from "../../../../../assets/img/badge_donaition.png";
import styled from "styled-components";
import api from "../../../../../api/auth";
import tw from "twin.macro";

const PointWallet = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [category, setCategory] = useState("ALL");
  const [datas, setDatas] = useState([]);
  const [length, setLength] = useState(0);
  const sort = ["ALL", "DONATION", "CHARGE"];
  const sortName = ["모두", "기부", "충전"];
  const [isLoading, setIsLoading] = useState(true);

  const getPointData = async () => {
    try {
      setIsLoading(true);
      // console.log(category, sort);
      const res = await api({
        url: "/users/me/points",
        method: "GET",
        params: {
          pageNumber: pageNum,
          pageSize: pageSize,
          category: category,
        },
        headers: {
          accept: "*/*",
        },
      });
      if (res) {
        setIsLoading(false);
        setDatas(res.data.pointList);
        setLength(res.data.length);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getPointData();
  }, [category]);
  return (
    <>
      <SortContainer>
        <Sort>
          <select onChange={(e) => setCategory(e.target.value)}>
            {sort.map((element, index) => (
              <option key={index} value={element}>
                {sortName[index]}
              </option>
            ))}
          </select>
        </Sort>
      </SortContainer>
      <div className="container">
        {datas?.map((data, index) => {
          // 날짜 형식 변경 - 이은혁
          const date = new Date(data.pointDate);
          const year = String(date.getFullYear()).slice(2, 4);
          const tmpM = String(date.getMonth() + 1);
          const tmpD = String(date.getDate());
          const month = tmpM.length === 1 ? "0" + tmpM : tmpM;
          const day = tmpD.length === 1 ? "0" + tmpD : tmpD;

          return (
            <>
              <div className="item" key={index}>
                <p>{datas.length === 0 ? "빈 값" : ""}</p>
                <div className="item_sec">
                  {data.category === "CHARGE" ? (
                    <img className="badge" src={badge_charge} alt="" />
                  ) : (
                    ""
                  )}
                  {data.category === "DONATION" ? (
                    <img className="badge" src={badge_donation} alt="" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="item_sec main_sec">
                  {data.category === "DONATION" ? (
                    <p className="weak">
                      <span>
                        [{data.generation}차] {data.projectSubject}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="title mb-1">
                    {data.category === "DONATION" ? "기부" : "충전"}
                  </p>
                  <p className="weak">{year + "." + month + "." + day}</p>
                </div>
                <div className="item_sec w-2">
                  {data.category === "DONATION" ? (
                    <p className="strong">- {data.points}P</p>
                  ) : (
                    <p className="strong">+ {data.points}P</p>
                  )}
                </div>
                <div className="item_sec w-2">
                  <p className="weak">받은 티켓</p>
                  <p className="strong">
                    <HiOutlineTicket
                      className="icon"
                      color="#c2c2c3"
                      size="1.5rem"
                    />{" "}
                    {data.ticketCnt}개
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* <table>
            <tbody>
                {datas?.map((data, index) => {
                return (
                <tr key={index}>
                <td>분류(기부/적립){data.category}</td>
                <td>프로젝트 차수{data.generation}</td>
                <td>포인트 적립/사용일{data.pointDate}</td>
                <td>포인트{data.points}</td>
                <td>주제{data.projectSubject}</td>
                <td>받은 티켓{data.ticketCnt}</td>
                </tr>
                )
                })}
            </tbody>
        </table> */}
      {/* <div className='group_pagebtn'>
            {pageList?.map((num, index)=>{
                return (
                    <button className={pageNum===num? "pagebtn current":"pagebtn"} key={index} onClick={()=> setPageNum(num)}>{num}</button>)
            })}
        </div> */}
      <p className="loading">
        {datas.length === 0 && !isLoading
          ? "내역이 존재하지 않습니다."
          : "로딩 중"}
      </p>
      <Paging
        page={pageNum}
        totalItem={length}
        setPage={(e) => setPageNum(e)}
      />{" "}
    </>
  );
};

const Sort = styled.div`
  position: absolute;
  top: -35px;
  right: 10px;
  z-index: 10;
  color: rgb(98, 102, 110);
  font-weight: 600;

  & > select {
    background-color: transparent;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const SortContainer = styled.div`
  position: relative;

  ${tw`

  `}
`;

export default React.memo(PointWallet);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁
