import React from 'react'
import { Container, Button } from 'react-bootstrap'

const LoginPage = ({ setUser, setUserType, setPage }) => {
  const loginAs = (user, userType) => {
    console.log(setUser)
    setUser(user)
    setUserType(userType)
    setPage('lessons')
  }

  const coaches = [
    {
      firstName: 'Albert',
      lastName: 'ainstain',
      id: 1
    },
    {
      firstName: 'Bob',
      lastName: 'Barley',
      id: 2
    }
  ]

  const students = [
    {
      firstName: 'Craig',
      lastName: 'Cranberry',
      id: 1
    },
    {
      firstName: 'Derek',
      lastName: 'Donut',
      id: 2
    },
    {
      firstName: 'Eggbert',
      lastName: 'Eggplant',
      id: 3
    }
  ]

  return (
    <Container>
      <div className="d-flex flex-row justify-content-around mt-5">
        <div>
          <h2>Login as a Coach:</h2>
          <div className="d-flex flex-column">
            {coaches.map((coach) => (
              <Button
                className="mt-3"
                key={coach.firstName + coach.lastName}
                onClick={() => loginAs(coach, 'coach')}
              >{`${coach.firstName} ${coach.lastName}`}</Button>
            ))}
          </div>
        </div>
        <div>
          <h2>Login as a Student:</h2>
          <div className="d-flex flex-column">
            {students.map((student) => (
              <Button
                className="mt-3"
                key={student.firstName + student.lastName}
                onClick={() => loginAs(student, 'student')}
              >{`${student.firstName} ${student.lastName}`}</Button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LoginPage
