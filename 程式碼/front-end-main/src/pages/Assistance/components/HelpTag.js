// ### hashtag ###
const arr = ['狗狗','代遛','不咬人']
const helptag = () => {
  return <div style={{width:'100%'}}>
  {
      arr.map(item => <div>#{item}</div>)
  }
  </div>
  
}

export default helptag;
