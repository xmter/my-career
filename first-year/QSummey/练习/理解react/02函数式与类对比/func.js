const {  Input  } = antd;
const {  AudioOutlined  } = icons;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
let number = 1;
let searchCb1 = null;
let searchCb2 = null;
const App = () => {
  console.log('执行' + (number++) + '次')
  const [value, setValue] = React.useState('123');
  const onSearch = value => {
     setValue(value)
  }

  const onSearchCallback = React.useCallback(value => {
    setValue(value)
  }, [])

  React.useEffect(() => {
     console.log('执行一次')
     searchCb1 = onSearch;
     searchCb2 = onSearchCallback;
  }, [])

  React.useEffect(() => {
      consle.log('searchCb1 === onSearch', searchCb1 === onSearch)
      console.log('searchCb2 === onSearchCallback', searchCb2 === onSearchCallback)
  })



  return (
    <>
      <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
      />
      {value}
    </>
  )
}

ReactDOM.render(<App />,mountNode);

