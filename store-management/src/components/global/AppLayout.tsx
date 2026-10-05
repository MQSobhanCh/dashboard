import { Outlet } from "react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const AppLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className='bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 min-h-screen p-8 pt-24 pl-72'>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
