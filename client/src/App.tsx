
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import routers from './routes/index'
import { AuthProvider, useAuth } from "@context/AuthContext";

import MainLayout from '@layouts/mainLayout';
function App() {

  return (
    <AuthProvider >
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              {routers
                .filter(route => !route.hideLayout) // Ẩn layout cho các trang đặc biệt
                .map((item, index) => (
                  <Route key={index} path={item.path} element={<item.component />} />
                ))}
            </Route>
            {routers
              .filter(route => route.hideLayout) // Chỉ lấy các route cần ẩn layout
              .map((item, index) => (
                <Route key={index} path={item.path} element={<item.component />} />
              ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
