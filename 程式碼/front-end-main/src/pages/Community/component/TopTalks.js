import React from "react";
import { Row, Col } from "react-bootstrap";

// 樣式
// import "../style/Intro.scss";
import "./style/TopTalks.scss";

// 插圖
// import everyone from "../images/text-top-talks.svg";
import everyone from "../images/everyone-talking.svg";
// import flag from "../images/icon-flag.svg";

// 大家都在談
function TopTalks(props) {
  return (
    <>
      {/* 最外層 */}
      <div className="top-talks-container d-md-block d-lg-block ">
        {/* 大家都在聊 */}
        <div className="everyone">
          <img src={everyone} className="ml-3" alt="everyone" />
        </div>
        {/* d-sm-none d-md-block d-lg-block */}
        {/* 內容 */}
        {/* <div className="top-talks-list"> */}
        <div className="top-talks-list text-center ">
          <div className="mao-rounded bg-primary talk-rows  ">
            <h6 className="talks  ">
              奴才罐罐買好買滿！憨汪「跳進購物籃」燦笑炫耀：全都偶的～
            </h6>
          </div>
          <div className="mao-rounded bg-secondary text-white talk-rows ">
            <h6 className="talks text-white ">
              愛貓失蹤6年半「流浪2400公里」靠晶片奇蹟尋獲：寶貝要回家了
            </h6>
          </div>
          <div
            sm={12}
            md={12}
            lg={12}
            className="mao-rounded bg-primary talk-rows">
            <h6 className="talks">
              可以帶貓咪出門散步嗎？貓奴一定要先知道的3件事！
            </h6>
          </div>
        </div>

        {/* <Row className="top-talks-list text-center  ">
            <Col sm={12} md={12} lg={12} className="mao-rounded bg-primary talk-rows align-middle ">
            <h6 className="talks ">
              奴才罐罐買好買滿！憨汪「跳進購物籃」燦笑炫耀：全都偶的～
            </h6>
            </Col>
            <Col sm={12} md={12} lg={12} className="mao-rounded bg-secondary text-white talk-rows ">
            <h6 className="talks text-white ">
              愛貓失蹤6年半「流浪2400公里」靠晶片奇蹟尋獲：寶貝要回家了
            </h6>
            </Col>
            <Col sm={12} md={12} lg={12} className="mao-rounded bg-primary talk-rows 
             ">
            <h6 className="talks">
              可以帶貓咪出門散步嗎？貓奴一定要先知道的3件事！
            </h6>
            </Col>
          </Row> */}
      </div>
    </>
  );
}

export default TopTalks;
