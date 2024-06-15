import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { timeTranslator } from './lessons.duck'

const EnrollPage = ({ setPage, userId, userType }) => {
  const [newLessons, setNewLessons] = useState([])

  const [showEditModal, setShowEditModal] = useState(false)
  const [lessonToEdit, setLessonToEdit] = useState()
  const handleClose = () => setShowEditModal(false)

  const lessonsGetUrl = `lessons/index`

  const refreshLessons = () => {
    fetch(lessonsGetUrl)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((res) => {
        setNewLessons(res)
        console.log(res)
      })
  }

  useEffect(() => {
    refreshLessons()
  }, [])

  let lessonToEditUrl = `lessons/${lessonToEdit}/enroll`

  const enrollLesson = (body) => {
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

  const newLessonsPart = (
    <div className="mb-5 pt-3">
      <h3>Upcoming Lessions</h3>
      <div>
        {newLessons.map((lesson) => (
          <Card
            className="mt-3"
            style={{ width: '40vw', backgroundColor: '#bee8e7' }}
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
                <p className="mb-0">{`Coach: ${lesson.coach.firstName} ${lesson.coach.lastName}`}</p>
                <p>{`Coach Introduction: ${lesson.coach.introduction}`}</p>
                <p>{lesson.description}</p>
                {lesson.coach && (
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
        <Modal.Title>Enroll in this lesson?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {lessonToEdit && (
          <>
            <h5>Enroll and share your phone number with the coach</h5>

            <Card className="mt-3" style={{ backgroundColor: '#bee8e7' }}>
              <Card.Body>
                <Card.Title>{lessonToEdit.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {lessonToEdit.date + ' ' + timeTranslator[lessonToEdit.time]}
                </Card.Subtitle>
                <Card.Text>
                  <p className="mb-0">{`Coach: ${lessonToEdit.coach.firstName} ${lessonToEdit.coach.lastName}`}</p>
                  <p>{`Coach Introduction: ${lessonToEdit.coach.introduction}`}</p>
                  <p>{lessonToEdit.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>
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
            enrollLesson({
              id: `${lessonToEdit.id}`,
              studentId: userId
            })
            handleClose()
          }}
        >
          Enroll
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <Container className="d-flex flex-column">
      <p onClick={() => refreshLessons()}>refresh</p>
      <div className="d-flex flex-row justify-content-around">
        <div className="d-flex flex-column">{newLessonsPart}</div>
      </div>
      {lessonEditModal}
    </Container>
  )
}

export default EnrollPage
