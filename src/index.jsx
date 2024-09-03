import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PageTest } from './test/PageTest';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageTest />
  </StrictMode>
);
