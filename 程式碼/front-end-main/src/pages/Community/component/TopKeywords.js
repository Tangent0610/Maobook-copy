import React from "react";
import { Row, Col } from "react-bootstrap";

// 樣式
// import "../style/Intro.scss";
import "./style/TopKeywords.scss";
import "./style/TopKeywords.scss";
import Keywords from "./Keywords";


// 插圖
import keywordsimg from "../images/text-top-keywords.svg";
// import keywords from "../images/frame-keywords.svg";


// TOP 關鍵字
function TopKeywords(props) {
  return (
    <>
      {/* 最外層 */}
        {/* 標籤 */}
       
          <Row className="top-keywords-container d-none d-md-block d-lg-block ">
          <Col md={2} lg={2} className="keywords " >
          {/* <img
            src={keywordsimg}
            alt="keywords"
          /> */}
          </Col>
        {/* TOP關鍵字 */}
            <Col md={10} lg={10} className="top-keywords-list mao-rounded ">
            {/* <div className="hashtags  "> */}
            <Keywords/>
            {/* <a className="hashtag d-block h3">#<a>動物醫院</a></a> */}
            
            {/* <a className="hashtag d-block">#<span>寵物旅館</span></a>
            
            <a className="hashtag d-block">#<span>寵物咖啡廳</span></a>
            
            <a className="hashtag d-block">#<span>好味小姐</span></a> */}
             
            {/* </div> */}
            </Col>
          </Row>
     
    </>
  );
}

export default TopKeywords;
