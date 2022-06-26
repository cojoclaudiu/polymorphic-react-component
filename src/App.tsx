import { useRef } from 'react';
import { Text } from './components';
import './App.css';

function Emphasis({ children }: { children: string | number }) {
  return <em style={{ background: 'crimson', color: 'white', fontSize: '30px' }}>{children}</em>;
}

function App() {
  const aRef = useRef<HTMLAnchorElement>(null);
  return (
    <div className="App">
      <Text as="h1">Hello world</Text>
      <Text as="h2">Hello world</Text>
      <Text as="h3">Hello world</Text>
      <Text>Hello world</Text>
      <Text as="a" href="http://google.com" ref={aRef} color="violet">
        Hello world
      </Text>

      <Text as={Emphasis}>Example!!!</Text>
    </div>
  );
}

export default App;
