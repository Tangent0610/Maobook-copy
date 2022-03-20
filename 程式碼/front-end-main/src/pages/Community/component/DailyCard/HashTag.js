// ### hashtag ###
const arr = ['開箱', '好味小姐', '貓年菜']
const hashtag = () => {
  // const HashTag = (props);
  return (
    <div style={{ width: '100%' }}>
      {arr.map((item) => (
        <div>#{item}</div>
      ))}
    </div>
  )
}

export default hashtag
