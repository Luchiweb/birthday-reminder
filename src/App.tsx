import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Today from './pages/Today/Today';
import MyBirthday from './pages/MyBirthday/MyBirthday';
import Friends from './pages/Friends/Friends';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/my-birthday" element={<MyBirthday />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
