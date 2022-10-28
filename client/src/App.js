import styled from 'styled-components';
import Home from './pages/Home';
const Container=styled.div`
  width: 100vw;
  height: 100vh;
`
function App() {
  return (
    <Container>
      <Home/>
    </Container>
  );
}

export default App;
