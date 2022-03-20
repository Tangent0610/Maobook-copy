// 樣式
// import "../style/Intro.scss";
import './style/Tools.scss'

// 插圖
import collect from '../images/icon-float-paw.svg'
import write from '../images/icon-float-writing.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

function Tools() {
  return (
    <>
      <div className="toolbox">
        {/* <AnchorLink
          href="#Dicuss-Page"
          className="btn-viewer d-block text-center text-decoration-none"
          title="查看你的日常發文"
        >
          <img src={collect} fixed="top" className="pointer" />
          <a className="bouble-counter h4">1</a>

          {/* <b className="d-block text-center">檢視貼文</b> */}
        {/* </AnchorLink>  */}

        <AnchorLink
          href="#Post-Page"
          className="btn-poster d-block text-center text-decoration-none"
          title="寫個日記吧"
        >
          <img src={write} fixed="top" />
          {/* <b className="d-block text-center">撰寫貼文</b> */}
        </AnchorLink>
      </div>
    </>
  )
}

export default Tools
