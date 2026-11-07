import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import ChatWidget from './components/chat/ChatWidget';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  const isDemoRoute =
    pathname.startsWith('/demo/') || /^\/demos\/gimnasio\/?$/.test(pathname);

  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo/:slug" element={<DemoPage />} />
        <Route path="/demos/gimnasio" element={<DemoPage demoId="iron-district" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDemoRoute && <ChatWidget />}
    </>
  );
}
