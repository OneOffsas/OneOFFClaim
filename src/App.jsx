import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
// Tu ajouteras Register, Login, ForgotPassword plus tard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Ajout à venir : <Route path="/register" .../> */}
      </Routes>
    </Router>
  );
}

export default App;
