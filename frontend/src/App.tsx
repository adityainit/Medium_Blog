import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Write } from './pages/Write'
import { MyBlogs } from './pages/MyBlogs'
import { Edit2 } from './pages/EditBlog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/write' element={<Write/>}/>
          <Route path="/edit/:id" element={<Edit2 />} />
          <Route path='/myblogs' element={<MyBlogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App