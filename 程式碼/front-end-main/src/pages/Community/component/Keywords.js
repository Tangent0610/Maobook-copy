// ### TOP關鍵字的標籤 ### //

const keywordArr = ['動物醫院', '寵物旅館', '寵物咖啡廳', '好味小姐']

const Keywords = () => {
  return (
    <>
      {keywordArr.map((keywords) => (
        <a className="hashtags h-keywords">
          {/* <span className="hashtag d-block h3"> */}#{keywords}
          {/* </span> */}
        </a>
      ))}
    </>
  )
}

Keywords.propTypes = {}

export default Keywords
