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
let searchCb3 = null;
class App extends React.Component {
    constructor(props) {
        console.log('执行一次');
        super(props);
        this.onSearch1copy = this.onSearch1.bind(this)
    }

  state = {
    value: 123
  };

  componentDidMount() {
     console.log('执行一次');
     searchCb1 = this.onSearch;
     searchCb2 = this.onSearch1copy;
     searchCb3 = this.onSearch2;
  }
  componentDidUpdate() {
    console.log('searchCb1 === onSearch', searchCb1 === this.onSearch)
    console.log('searchCb2 === onSearch', searchCb2 === this.onSearch1copy)
    console.log('searchCb3 === onSearch', searchCb3 === this.search2Bind)
  }

  onSearch = value => {
    this.setState({
      value
    });
  };

  onSearch1 ( value ){
    this.setState({
      value
    });
  };

  onSearch2 ( value ){
    this.setState({
      value
    });
  };

  render () {
    console.log('执行' + (number++) + '次')
    const {value} = this.state;
    this.search2Bind = this.onSearch2.bind(this);
    return (
      <>
        <Search
        placeholder="input search text"
        // onSearch={this.onSearch}
        // onSearch={this.onSearch1copy}
        // onSearch={this.search2Bind}
        onSearch={this.onSearch2.bind(this)}
        style={{ width: 200 }}
      />
      {value}
     </>
   )
  }
}

ReactDOM.render(<App />,mountNode);