import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/:slug" element={<DemoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
