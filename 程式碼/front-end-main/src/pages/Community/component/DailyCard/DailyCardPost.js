import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// 樣式
import "./style/DailyCardPost.scss";

// 插圖

function DailyCardPost(props) {
  return (
    <Container fluid className="h-100">
      {/* 標題 */}
      <Row>
        <Col className="">
          <Row>
            <Col sm={2} md={2}>
              <div>avatar</div>
            </Col>
            <Col sm={3} md={3}>
              大毛
              <br />
              ＠maobook
            </Col>
            <Col sm={{ span: 4, offset: 3 }} md={{ span: 4, offset: 3 }}>
              2021年9月16日 15:55
            </Col>
          </Row>
        </Col>
      </Row>
      {/* 標題 end */}
      {/* 內文 */}
      <Row className="daily-post-body border-top-primary">
        <Col>1 of 1</Col>
      </Row>
      {/* 內文 end */}
      {/* 留言 */}
      <Row className="daily-post-comment border-top-primary">
        <Col>1 of 1</Col>
      </Row>
      {/* 留言 end */}
    </Container>
    // <div className='daily-post-container'>
    // <div className='daily-post-title'>
    // title
    // <div className='daily-avatar bg-dark'>avatar</div>

    // </div>
    //     <div className='daily-post-body border-top-primary'>
    //     123
    //     </div>
    //     <div className='dali-post-comment border-top-primary'></div>
    // </div>
  );
}

export default DailyCardPost;
