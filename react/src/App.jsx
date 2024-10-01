import Stage from "./components/Stage";
import Student from "./components/Student";
import Students from "./components/Students";
import ClassDeps from "./components/ClassDeps";
import {Route, Routes } from "react-router-dom";
import NewSubject from "./components/NewSubject";
import NewOutcome from "./components/NewOutcome";
import Quiz from "./components/quiz/Quiz";
import QuizCreate from "./components/quiz/QuizCreate";
//Hello



function App() {

    return <Routes>
      <Route path="/" element ={<Stage />} />
      <Route path="/classes" element= {<ClassDeps />} />
      <Route path="/class/:id" element= {<Students />} />
      <Route path="/student/:id" element= {<Student />} />
      <Route path="/create/subject" element= {<NewSubject />} />
      <Route path="/create/outcome" element= {<NewOutcome />} />
      <Route path="/quiz/:id" element = {<Quiz />} />
      <Route path="/quiz/create" element = {<QuizCreate />} />
    
    </Routes>
 }

export default App
