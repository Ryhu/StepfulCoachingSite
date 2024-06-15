import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Nav, Navbar } from 'react-bootstrap'
import LoginPage from './LoginPage'
import LessonsPage from './LessonsPage'
import CreateLessonPage from './CreateLessionPage'
import EnrollPage from './EnrollPage'

const Home = () => {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState({
    firstName: 'albert',
    lastName: 'ainstain',
    id: 1
  })
  const [userType, setUserType] = useState('coach')

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Stepful Courses</Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            {userType == 'coach' ? (
              <Nav className="me-auto">
                <Nav.Link href="#lessons" onClick={() => setPage('lessons')}>
                  Lessons
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="#lessons" onClick={() => setPage('lessons')}>
                  Lessons
                </Nav.Link>
                <Nav.Link href="#enroll" onClick={() => setPage('enroll')}>
                  Enroll
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>

          <Nav className="me-auto">
            <Nav.Link href="#login" onClick={() => setPage('login')}>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        {page == 'login' && (
          <LoginPage
            setUserType={setUserType}
            setUser={setUser}
            setPage={setPage}
          />
        )}
        {/* {page == 'dashboard' && <DashboardPage />} */}
        {page == 'lessons' && (
          <LessonsPage setPage={setPage} userId={user.id} userType={userType} />
        )}
        {page == 'enroll' && <EnrollPage userId={user.id} />}
        {page == 'createLesson' && (
          <CreateLessonPage setPage={setPage} coachId={user.id} />
        )}
      </div>
    </div>
  )
}

export default Home
