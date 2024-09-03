import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PagePost } from './test/PagePost';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PagePost />
  </StrictMode>
);
