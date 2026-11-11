import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import OneGamePage from './components/OneGamePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game/:id" element={<OneGamePage />} />
        <Route path="*" element={<p>Sidan finns inte.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
