import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { Web3Context } from './contexts/Web3Context';

function App() {
  const [owner, setOwner] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [addressToSend, setAddressToSend] = useState('');
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState('');
  const { web3, contract, accounts } = useContext(Web3Context);

  const getOwner = useCallback(async () => {
    const owner = await contract.methods.owner().call();
    setOwner(owner)
  }, [contract])

  const getBalance = useCallback(async () => {
    const balance = await contract.methods.balanceOf().call();
    setBalance(balance)
  }, [contract])

  const handleDeposit = async () => {
    await contract.methods
      .deposit()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(deposit)
      })
    setDeposit('');
    await getBalance();
  }

  const handleSend = async () => {
    await contract.methods
      .send(addressToSend, web3.utils.toWei(amountToSend))
      .send({
        from: accounts[0]
      })
    setAddressToSend('');
    setAmountToSend('');
    await getBalance();
  }

  useEffect(() => {
    getOwner()
    getBalance()
  }, [getOwner, getBalance])

  return (
    <div className="App">
      <div className='container'>
        <p><b>Address: </b> {accounts[0]}</p>
        <p><b>Wallet Balance: </b> {balance && web3.utils.fromWei(balance)} ETH</p>

        <Col justify='start'>
          <Row className='col-md-4'>
            <input
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              className='form-control'
              type='number'
              placeholder='Amount'
            />
            <input
              value={addressToSend}
              onChange={(e) => setAddressToSend(e.target.value)}
              className='form-control'
              placeholder='Address'
            />
            <Button
              onClick={handleSend}
              disabled={!addressToSend || !amountToSend}
              size='md'>
              Send
            </Button>
          </Row>
          <br />
          <Row className='col-md-4'>
            <input
              className='form-control'
              placeholder='Amount (in ETH)'
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              type='number'
            />
            <Button
              size='md'
              onClick={handleDeposit}
              disabled={!deposit}>
              Deposit
            </Button>
          </Row>
        </Col>

      </div>
    </div>
  );
}

export default App;
