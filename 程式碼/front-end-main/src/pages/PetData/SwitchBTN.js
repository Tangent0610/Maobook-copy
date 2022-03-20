import React from "react";
import styled from "styled-components";

// styled components
const StyledSwitchBTN = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  .switch-btn {
    width: 46px;
    background-color: #f6bc54;
    border-radius: 15px;
    border: 2px solid #f6bc54;
    padding: 0;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    outline: none;
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      background-color: #FFFFFF;
      border-radius: 50%;
      box-shadow: 0px 1px 3px rgba(30, 30, 30, 0.3);
      transition: all 300ms ease-in-out;
      transform: ${props => props.active ? 'translate(22px)' : 'translate(0)'};
      display: block;
    }
  }
  .span1 {
    color: ${props => props.active ? "#989898" : "#6a5f4b"};
    font-weight: ${props => props.active ? "400" : "550"};
    font-size: 0.9rem;
    margin: 0 5px;
  }
  .span2 {
    color: ${props => props.active ? "#6a5f4b" : "#989898"};
    font-weight: ${props => props.active ? "550" : "400"};
    font-size: 0.9rem;
    margin: 0 5px;
  }
`;

// Switch Button Component
// 透過 props 接收外部傳進來三個屬性的值
// 1. type: 設置 Switch Button 按鈕類型。
// 2. active: Switch Button 狀態。
// 3. clicked: toggleSwitchButton (Method) 切換 Switch Button。
function SwitchBTN(props) {
  return (
    <StyledSwitchBTN active={props.active}>
        <span className="span1 text-nowrap">身長</span>
        <button type={props.type} onClick={props.clicked} className="switch-btn"></button>
        <span className="span2 text-nowrap">體重</span>
    </StyledSwitchBTN>
  )
}


export default SwitchBTN
