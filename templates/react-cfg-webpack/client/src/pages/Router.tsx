import { useState, useLayoutEffect } from 'react';
import { Router as ReactRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { createHashHistory } from 'history';
import { useInsight } from '@semoss/sdk-react';
import { NewChat } from '@/components/chat/Chat';
import { Loader2 } from 'lucide-react';

export const history = createHashHistory();

export const Router = () => {
    const insight = useInsight();

    // insight.isInitialized();
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    // don't load anything if it is pending
    if (!insight.isInitialized) {
        return (
          <div className="h-screen w-full flex justify-center items-center">
            <div className="grid place-items-center h-20 w-20">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          </div>
        );
    }

    if (insight.error) {
        return <>Error</>;
    }

    return (
        <ReactRouter
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            <Routes>
              <Route path="/" element={<Outlet />}>
                  <Route index element={<NewChat />} />
              </Route>
            </Routes>
        </ReactRouter>
    );
};
