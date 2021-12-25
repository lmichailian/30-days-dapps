import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import { Web3Context } from './contexts/Web3Context';

function App() {
  const { web3, contract, accounts } = useContext(Web3Context)
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({});
  const [name, setName] = useState('');

  const getAll = useCallback(async () => {
    const users = await contract.methods.getAll().call()
    setUsers(users.filter(el => el.id !== '0'))
  }, [contract])

  useEffect(() => {
    getAll()
  }, [getAll])

  function onChange(e) {
    const value = e.target.value;
    setName(value);
  }

  async function onDelete(id) {
    await contract.methods.destroy(id).send({ from: accounts[0] });
    await getAll();
  }

  function onEditing(id, name) {
    setEditing({ [id]: { name, active: true } })
  }

  async function onUpdate(id, name) {
    await contract.methods.update(id, name).send({ from: accounts[0] });
    setEditing({ [id]: { name, active: false } })
    await getAll();
  }

  async function onSubmit(e) {
    e.preventDefault();

    await contract.methods.create(name).send({ from: accounts[0] });
    await getAll();
    setName('');
  }

  return (
    <div className="App">

      <div className='container mt-4'>
        <header className='my-4'><b>ACCOUNT:</b> {accounts[0]}</header>
        <Row>
          <Col md={6}>
            <h2>
              Create User
            </h2>
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
              <input
                value={name}
                onChange={onChange}
                className='form-control'
                placeholder='Fill name'
              />

              <Button type='submit' disabled={!name}>Save</Button>
            </form>
          </Col>
          <Col md={6}>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((el, key) => (
                  <tr key={key}>
                    <td>{el.id}</td>
                    <td>{editing[el.id]?.active ?
                      <input
                        value={editing[el.id].name}
                        onChange={(e) => onEditing(el.id, e.target.value)}
                        className='form-control'
                        placeholder='Fill name'
                      /> : el.name}</td>
                    <td>
                      {
                        !editing[el.id]?.active ?
                          <Button
                            onClick={() => onEditing(el.id, el.name)}
                            size='xs'>
                            Edit
                          </Button>
                          : <Button
                            onClick={() => onUpdate(el.id, editing[el.id].name)}
                            size='xs'>
                            Save
                          </Button>
                      }
                      <Button
                        onClick={() => onDelete(el.id)}
                        color='danger'
                        size='xs'>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

        </Row>
      </div>
    </div>
  );
}

export default App;
