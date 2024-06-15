import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { timeTranslator } from './lessons.duck'

const LessonsPage = ({ setPage, userId, userType }) => {
  const [upcomingLessions, setUpcomingLessions] = useState([])
  const [pastLessons, setPastLessons] = useState([])
  const [lessonsToScore, setLessonsToScore] = useState([])

  const [showEditModal, setShowEditModal] = useState(false)
  const [lessonToEdit, setLessonToEdit] = useState()
  const handleClose = () => setShowEditModal(false)
  const handleShow = () => setShowEditModal(true)

  const [score, setScore] = useState()
  const [notes, setNotes] = useState()

  const lessonsGetUrl =
    userType === 'coach'
      ? `coach/${userId}/lessons`
      : `student/${userId}/lessons`

  const sortLessons = (allLessons) => {
    let oldLessons = []
    let newLessons = []
    let unfinishedLessons = []
    const dateNow = new Date()

    allLessons.forEach((lesson) => {
      const lessonDate = new Date(`${lesson.date} ${lesson.time}:00`)

      if (lessonDate > dateNow) {
        newLessons.push(lesson)
      } else {
        if (userType === 'coach') {
          lesson.score
            ? oldLessons.push(lesson)
            : unfinishedLessons.push(lesson)
        } else {
          oldLessons.push(lesson)
        }
      }
    })

    setUpcomingLessions(newLessons)
    setPastLessons(oldLessons)
    setLessonsToScore(unfinishedLessons)
  }

  const refreshLessons = () => {
    fetch(lessonsGetUrl)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((res) => {
        // setUpcomingLessions(res)
        sortLessons(res)
        console.log(res)
      })
  }

  useEffect(() => {
    refreshLessons()
  }, [])

  let lessonToEditUrl = `lessons/${lessonToEdit}/patch`

  const scoreLesson = (body) => {
    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(lessonToEditUrl, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (response.ok) {
          refreshLessons()
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .catch((error) => console.log(error.message))
  }

  const upcomingLessionsPart = (
    <div className="mb-5 pt-3">
      <h3>Upcoming Lessions</h3>
      <div>
        {upcomingLessions.map((lesson) => (
          <Card
            className="mt-3"
            style={{ width: '33vw', backgroundColor: '#bee8e7' }}
          >
            <Card.Body>
              <Card.Title>{lesson.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {lesson.date + ' ' + timeTranslator[lesson.time]}
              </Card.Subtitle>
              <Card.Text>
                <p>{lesson.description}</p>
                {userType === 'coach' && lesson.student && (
                  <>
                    <p>
                      {`Student: ${lesson.student.firstName} ${lesson.student.lastName}`}
                    </p>

                    <p>{`Student's phone number: ${lesson.student.phone}`}</p>
                  </>
                )}
                {userType === 'student' && (
                  <>
                    <p>
                      {`Coach: ${lesson.coach.firstName} ${lesson.coach.lastName}`}
                    </p>

                    <p>{`Coach's phone number: ${lesson.coach.phone}`}</p>
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )

  const pastLessonsPart = (
    <div className="mb-5">
      <h3>Past Lessons</h3>
      <div>
        {pastLessons.map((lesson) => (
          <Card
            className="mt-3"
            style={{ width: '33vw', backgroundColor: '#f5d0d1' }}
          >
            <Card.Body>
              <Card.Title>{lesson.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {lesson.date + ' ' + timeTranslator[lesson.time]}
              </Card.Subtitle>
              <Card.Text>
                <p>{lesson.description}</p>
                <p>Score: {lesson.score}</p>
                <p>Notes: {lesson.notes}</p>
                {lesson.student && (
                  <>
                    <p>
                      {`Student: ${lesson.student.firstName} ${lesson.student.lastName}`}
                    </p>

                    <p>{`Student's phone number: ${lesson.student.phone}`}</p>
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )

  const lessonsToScorePart = (
    <div className="mb-5 pt-3">
      <h3>Lessons To Grade</h3>
      <div>
        {lessonsToScore.map((lesson) => (
          <Card
            className="mt-3"
            style={{ width: '33vw', backgroundColor: '#a5e8b7' }}
            onClick={() => {
              setLessonToEdit(lesson)
              setShowEditModal(true)
            }}
          >
            <Card.Body>
              <Card.Title>{lesson.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {lesson.date + ' ' + timeTranslator[lesson.time]}
              </Card.Subtitle>
              <Card.Text>
                <p>{lesson.description}</p>
                {userType === 'coach' && lesson.student && (
                  <>
                    <p>
                      {`Student: ${lesson.student.firstName} ${lesson.student.lastName}`}
                    </p>

                    <p>{`Student's phone number: ${lesson.student.phone}`}</p>
                  </>
                )}
                {userType === 'student' && (
                  <>
                    <p>
                      {`Coach: ${lesson.coach.firstName} ${lesson.coach.lastName}`}
                    </p>

                    <p>{`Coach's phone number: ${lesson.coach.phone}`}</p>
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )

  const lessonEditModal = (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>How was the lesson?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {lessonToEdit && (
          <>
            <h5>Leave a review for the lesson:</h5>

            <Card className="mt-3" style={{ backgroundColor: '#a5e8b7' }}>
              <Card.Body>
                <Card.Title>{lessonToEdit.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {lessonToEdit.date + ' ' + timeTranslator[lessonToEdit.time]}
                </Card.Subtitle>
                <Card.Text>
                  <p>{lessonToEdit.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Form.Label className="mt-5">Score:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rate the lesson from 1-5!"
              value={score}
              max={5}
              min={1}
              onChange={(e) => setScore(e.target.value)}
            />

            <Form.Label className="mt-4">Notes:</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="7"
              placeholder="Describe how your lesson went"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            scoreLesson({
              id: `${lessonToEdit.id}`,
              score,
              notes
            })
            handleClose()
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <Container className="d-flex flex-column">
      {userType === 'coach' && (
        <Button className="mt-4" onClick={() => setPage('createLesson')}>
          <h3 className="p-0 m-0">Create New Lesson</h3>
        </Button>
      )}
      <p onClick={() => refreshLessons()}>refresh</p>
      <div className="d-flex flex-row justify-content-around">
        <div className="d-flex flex-column">
          {upcomingLessionsPart}
          {pastLessonsPart}
        </div>

        {userType === 'coach' && (
          <div className="d-flex flex-column">{lessonsToScorePart}</div>
        )}
      </div>
      {lessonEditModal}
    </Container>
  )
}

export default LessonsPage
