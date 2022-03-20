import React from 'react'
import { Container, Modal, Button } from 'react-bootstrap'

// 彈出視窗

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      z-index="999"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">免責聲明</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <br />
          <p>
            &emsp;&emsp;您好，本站(MaoBook - 爪爪日記) 為資展國際股份有限公司(原
            資策會就業養成教育部門)開設之
            <a
              className="text-danger"
              href="https://www.iiiedu.org.tw/f2e/"
              target="_blank"
              rel="noreferrer"
            >
              「前端工程師就業養成班」
            </a>
            ，班代號 <b>MFEE22</b> 課程專題展示成果。
            <br />
            &emsp;&emsp;製作團隊於此申明，本站為課程專題「電商平台」製作，為
            <b>展示學習成效</b>
            之用途。但因站內大部分素材來源取自於網路相關影像，基於非企圖導致他人智慧財產權、著作權及商標權等受到侵權之目的，本站所使用之非經授權使用圖片若因所有權者或因本站使用的影像而權利受到損害者，造成困擾深感抱歉，請與我們聯繫，我們將盡速下架相關內容，謝謝！
          </p>
          <br />
          <br />
          <div className="text-end text-decoration-none text-dark">
            學員聯絡信箱：
            <a
              className="text-danger"
              href="mailto:st.mfee22@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              st.mfee22@gmail.com
            </a>
            <br />
            資展國際股份有限公司：
            <a
              className="text-danger"
              href="tel:+0266316588"
              target="_blank"
              rel="noreferrer"
            >
              02-6631-6588
            </a>
            &ensp;
            <a
              className="text-danger"
              href="mailto:iservice@ispan.com.tw"
              target="_blank"
              rel="noreferrer"
            >
              iservice@ispan.com.tw
            </a>
          </div>
          <br />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>關閉</Button>
      </Modal.Footer>
    </Modal>
  )
}

function Footer(props) {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <footer>
        <div className="container">
          <span className="text-white">
            {/* 黃貓:🐈; 黑貓:🐈‍⬛／狗狗:🐕; 服務犬:🐕‍🦺; 導盲犬:🦮／paw:🐾 */}
            ＠2022 Maobook 🐈🐕
            <a
              className="text-white pointer"
              onClick={() => setModalShow(true)}
            >
              專題版權免責聲明
            </a>
          </span>
        </div>
      </footer>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default Footer
