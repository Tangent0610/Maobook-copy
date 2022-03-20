import React from "react";
import { Row, Col } from "react-bootstrap";
// 樣式
import "./style/Intro.scss";
import "../Community.scss";

// 插入元件
import Toptalks from "./component/TopTalks";
import ToptalksMobile from "./component/TopTalksMobile";
import Topkeywords from "./component/TopKeywords";

// SVG
import cover from "./images/intro-cover.svg";
import office from "./images/picture-office.svg";
import titleBold from "./images/text-title-bold.svg";

function Intro() {
  return (
    <>
      <Row>
        {/* [第一塊] */}
        <Col sm={12} md={0} lg={0} className="d-sm-block d-md-none d-lg-none">
          {/* mobile 文案 */}
          <h3 className=" font-weight-bold mt-4 d-md-none d-lg-none d-xl-none">
            每一刻美好
            <br />
            都值得您與大家分享
          </h3>
          <p className=" font-weight-boldd-md-none d-lg-none d-xl-none">
            溫馨的寵物餐廳
            <br />
            美好的戶外踏青
            <br />
            毛孩到家的第一次慶祝
            <br />
            都值得你細心紀錄
          </p>
        </Col>

        {/* [ 第二塊 ]*/}
        <Col sm={12} md={6} lg={6}>
          {/* 電腦版 */}

          {/* 元件：大家都在談 */}
          <Toptalks />
          {/* 元件：TOP關鍵詞 */}
          <Topkeywords />

          {/* 手機版 */}
          <img
            src={office}
            className="d-sm-block d-md-none d-lg-none d-xl-none ml-2 "
          ></img>
        </Col>

        {/* [第三塊: OFFICE]*/}
        <Col sm md={0} lg={0} className="d-sm-block d-md-none d-lg-none">
          {/* sm Toptalks */}
          <ToptalksMobile />
        </Col>

        {/* [ 第四塊: 右側:插圖  ]*/}
        <Col md={6} lg={6}>
          <div className="cover d-xs-none d-sm-none d-md-block d-lg-block">
            <img
              src={cover}
              className="d-xs-none d-sm-none d-md-block d-lg-block"
            />
          </div>
          {/* sm版標題 */}
          <img src={titleBold} className="titleBold" />
     
        </Col>
      </Row>
    </>
  );
}

export default Intro;
