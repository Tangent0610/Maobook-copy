import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import '../Store/style/FAQStyle.scss'

function FAQ() {
  return (
    <section className="d-flex justify-content-center mb-5">
      <Accordion className="FAQarea  pointer" defaultActiveKey="0">
        <Card className="FAQcard">
          <Accordion.Toggle className="FAQHeader" as={Card.Header} eventKey="0">
            購物說明
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="FAQBody">
              交易信任度說明：
              如果您已經在本站下單，但是卻拒收包裹、包裹到店不取，本站將視狀況限制您的購買權力。拒收未取說明
              罐頭配送說明
              罐頭類商品非常容易因運送過程的碰撞造成凹傷、凹罐，我們能保證我們出貨的罐頭絕對沒有凹傷、凹罐，且儘量完善的使用保護包材保護它，如果還是發生我們不予以退換貨，
              很介意凹罐問題，請您千萬不下單購買，下單代表您同意。 出貨全程錄影
              為了保障買賣雙方權益，我們所有的包裹出貨都全程監控，如有疑問都可以請客服調閱相關紀錄！
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="FAQcard">
          <Accordion.Toggle className="FAQHeader" as={Card.Header} eventKey="1">
            退貨申請
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="FAQBody">
              依照消費者保護法規定，消費者均享有產品到貨7天猶豫期(含例假日)之權益(猶豫期並非試用期)，收到商品後隔天起算為第一天，含：如收件地址有管理員代收，則以管理員簽收的隔日起算起。
              您所退回的商品必須保持商品本體、附件、內外包裝、配件、贈品、保證書、原廠包裝及所有隨附文件或資料的完整性，切勿缺漏任何配件或損毀原廠外盒，退回商品無法回復原狀者，會視回收的商品狀態另外酌收額外的整新費用，請您務必確認有購買需求後再行拆封。
              請您以送貨使用之原包裝紙箱將退貨商品包裝妥當，若原紙箱已遺失，請另使用其他紙箱包覆於商品原廠包裝之外，切勿直接於原廠包裝上黏貼紙張或書寫文字
              箱購商品因為整箱為一單位，拆封後不接受退貨
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="FAQcard">
          <Accordion.Toggle className="FAQHeader" as={Card.Header} eventKey="2">
            如何使用 7-11 交貨便退貨 FAQ
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className="FAQBody">
              自 2022/01/03 起，針對 Pinkoi 訂單，只要商品的類型、包裝材積，符合
              「Pinkoi 7-ELEVEN交貨便服務規範」，設計師即可選擇提供透過 Pinkoi
              系統申請交貨便退貨的服務。申請退款後，會由設計師端審核退貨商品是否符合
              7-11 退貨規範，會由設計師判斷並提供 7-11
              交貨便退貨服務，如設計師審核退款狀態且完成 7-11
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="FAQcard">
          <Accordion.Toggle className="FAQHeader" as={Card.Header} eventKey="3">
            物流拒收 超商未取說明
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className="FAQBody">
              為了體會客戶，方便客戶取貨方便，本站與同業不同，開放部分商品超商取貨付款
              假使您有在本站購買商品，確實成立訂單了，如果您想取消訂單
              請務必通知本站
              物流拒收、超商未取、鑑賞期內無故退貨者，本站將列入特殊名單，該帳號下次購物將限制只能使用信用卡付款，確認收款後才會出貨
              惡意多次物流拒收、超商未取者，本站將依法處理，委請法律顧問提告
              如要退貨，請於退貨申請頁面內填入您的資料，如有其他問題可以與客服人員連繫。
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </section>
  )
}

export default FAQ
