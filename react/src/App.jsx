import Stage from "./components/Stage";
import Student from "./components/Student";
import Students from "./components/Students";
import ClassDeps from "./components/ClassDeps";
import ClassDep from "./components/ClassDep";
import {Route, Routes } from "react-router-dom";
import NewSubject from "./components/NewSubject";
import NewOutcome from "./components/NewOutcome";



function App() {

    return <Routes>
      <Route path="/" element ={<Stage />} />
      <Route path="/classes" element= {<ClassDeps />} />
      <Route path="/class/:id" element= {<Students />} />
      <Route path="/student/:id" element= {<Student />} />
      <Route path="/create/subject" element= {<NewSubject />} />
      <Route path="/create/outcome" element= {<NewOutcome />} />
    
    </Routes>
 }

export default App
