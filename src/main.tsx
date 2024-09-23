import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import axe from '@axe-core/react';
import ko from 'axe-core/locales/ko.json';
import Modal from 'react-modal'; // 추가된 import

import '@/styles/main.css';
import App from './App';

Modal.setAppElement('#root');

// 개발 버전에서만 접근성 검사되도록 조건 처리
if (process.env.NODE_ENV !== 'production') {
   axe(React, ReactDOM, 1000, { locale: ko } as any);
}

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
   throw new Error('문서에 "#root" 요소가 존재하지 않습니다.');
}

createRoot(container).render(
   <StrictMode>
      <App />
   </StrictMode>
);
