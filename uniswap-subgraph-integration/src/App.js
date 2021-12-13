import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import Pools from './components/Pools';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap'
import Header from './components/Header';

const queryClient = new QueryClient()

function App() {
  const [days, setDays] = useState(5)
  const [transactionCount, setTransactionCount] = useState(100)
  const [volume, setVolume] = useState(20000)
  const [tvl, setTvl] = useState(30000)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Container>
          <Header />
          <Row>
            <Col>
              <InputGroup size="md">
                <InputGroup.Text
                  id="inputGroup-sizing-lg">
                  Days
                </InputGroup.Text>
                <FormControl
                  aria-label="Days"
                  aria-describedby="inputGroup-sizing-sm"
                  value={days}
                  onChange={(e) => { setDays(e.target.value); }} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="md">
                <InputGroup.Text id="inputGroup-sizing-lg"
                >Transaction Count</InputGroup.Text>
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={transactionCount}
                  onChange={(e) => { setTransactionCount(e.target.value); }} />
              </InputGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col>
              <InputGroup size="md">
                <InputGroup.Text
                  id="inputGroup-sizing-lg">
                  Total Volume Locked
                </InputGroup.Text>
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={tvl}
                  onChange={(e) => { setTvl(e.target.value); }} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="md">
                <InputGroup.Text
                  id="inputGroup-sizing-lg">
                  volume
                </InputGroup.Text>
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  value={volume}
                  onChange={(e) => { setVolume(e.target.value); }} />
              </InputGroup>
            </Col>
          </Row>
          <Pools
            days={days}
            volume={volume}
            transactionCount={transactionCount}
            tvl={tvl} />
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
