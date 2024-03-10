import { PageProvider } from '@/setup/context/PageProvider';
import React from 'react'
import { FacebookProvider } from 'react-facebook';
import { Routes,Route } from 'react-router-dom'
import Connect from './Connect';
import Conversations from './Conversations';
import NotFound from './NotFound';

const Page = () => {
  return (
    <PageProvider>
      <Routes>
        <Route
          path="/connect"
          element={
            <FacebookProvider appId="1373741216661586">
              <Connect />
            </FacebookProvider>
          }
        />
        <Route path="/app/*" element={<Conversations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageProvider>
  );
}

export default Page
