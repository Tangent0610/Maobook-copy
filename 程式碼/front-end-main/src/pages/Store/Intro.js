// import { Col, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'
import '../Store/style/IntroStyle.scss'

//圖片
import MaoStore from './storePic/MaoStore.png'
import person from './storePic/person.svg'
import paw from './storePic/paw.svg'
import maoselection from './storePic/maoselection.png'
import carticon from './storePic/carticon.svg'
import arrow from './storePic/arrow.svg'
import playbtn from './storePic/playbtn.svg'
import playarea from './storePic/playarea.svg'
function Intro() {
  const history = useHistory()

  return (
    <>
      <section className="wrap">
        <div>
          <img className="MaoStore" src={MaoStore} alt="MaoStore" />
        </div>
        <div className="text1">
          給每個階段的毛孩
          <br />
          最適合牠的禮物
        </div>
        <div>
          <img className="playarea" src={playarea} alt="playarea" />
        </div>
        <div>
          <img className="person" src={person} alt="person" />
        </div>
        <div>
          <img className="paw img-fluid" src={paw} alt="paw" />
        </div>
        <div className="text2 font-weight-bold">
          每個毛孩
          <br />
          都有最適合牠的禮物
        </div>
        <div className="text3 font-weight-bold">
          毛孩乾食、濕食、點心
          <br />
          舒服的被窩、合適的玩具
          <br />
          在這裡，你可以找到最適合毛孩的禮物
        </div>
        <div>
          <img className="maoselection" src={maoselection} alt="maoselection" />
        </div>

        <div className="text4">
          為親愛的牠
          <br />
          挑選個禮物吧
        </div>
        <div>
          <img className="arrow" src={arrow} alt="arrow" />
        </div>
        {/* <div>
          <img className="playbtn" src={playbtn} alt="playbtn" />
        </div> */}
      </section>
    </>
  )
}

export default Intro
