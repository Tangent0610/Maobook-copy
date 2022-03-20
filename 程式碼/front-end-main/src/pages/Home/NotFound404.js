import React from 'react'
import Logo from '../../img/LOGO_no_word.svg'
import NotFoundWord from '../../img/404/NotFound_word.svg'
import NotFoundImg from '../../img/404/NotFound_404.svg'
import ImgWord404 from '../../img/404/img_word_404.svg'
import './NotFound404.scss'

function NotFound404(props) {
  return (
    <div>
      <div className="login-space-section">
        <div className="container">
          <div className="row position-relative">
            {/* 排版用空白左側區塊 */}
            <div className="col-lg-5 d-none d-lg-block"></div>
            {/* 中間圖文區塊 */}
            <div className="col-lg-4">
              {/* 404 圖 */}
              <div className="not-found-img">
                <img alt="" className="img-fluid" src={NotFoundImg} />
              </div>
              <h5 className="text-secondary text-center not-found-h5">
                頁面好像出錯了
                <br />
                請重新整理再試試
              </h5>
            </div>
            {/* 排版用空白右側區塊 */}
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>

      <div className="bg-primary position-relative bottom-section">
        <div className="container">
          {/* logo 大圖  */}
          <div className="notfound-logo-noword position-absolute">
            <img alt="" className="img-fluid" src={Logo} />
          </div>
          {/* MEO橫條字圖 */}
          <div className="position-absolute d-none d-lg-block img-meo-word">
            <img alt="" className="img-fluid" src={ImgWord404} />
          </div>
          {/* NotFound 字 */}
          <div className="d-none d-lg-block position-absolute not-found-word">
            <img alt="" className="img-fluid" src={NotFoundWord} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound404
