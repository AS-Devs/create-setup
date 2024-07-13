import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
        <Toaster position="bottom-right" reverseOrder={false} />
    </React.StrictMode>,
);
