import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { ToastProvider } from './components/ui/ToastProvider.jsx'

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
