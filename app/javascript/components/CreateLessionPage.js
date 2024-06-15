import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { Container, Button, Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { createLesson, timeTranslator } from './lessons.duck'

const CreateLessonPage = ({ setPage, coachId }) => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [time, setTime] = useState()
  const [date, setDate] = useState()
  const [allLessonsObject, setAllLessonsObject] = useState()

  const [blacklist, setBlacklist] = useState([])

  const updateBlacklist = (value) => {
    setBlacklist(allLessonsObject[value.toLocaleString().split(',')[0]] || [])
  }

  const lessonsGetUrl = `coach/${coachId}/lessons`

  const refreshLessons = () => {
    fetch(lessonsGetUrl)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((res) => {
        let dateDic = {}
        res.forEach((lesson) => {
          if (dateDic[lesson.date]) {
            dateDic[lesson.date].push(lesson.time)
          } else {
            dateDic[lesson.date] = [lesson.time]
          }
        })

        setAllLessonsObject(dateDic)
      })
  }

  useEffect(() => {
    refreshLessons()
  }, [])

  const placeHolderText = (text) => (
    <span style={{ color: '#A9A9AC', fontStyle: 'italic' }}>{text}</span>
  )

  return (
    <Container>
      <h2 className="mt-3">Create a new lesson</h2>

      <div className="d-flex mt-5 flex-row justify-content-center">
        <Card
          style={{
            minWidth: '27rem',
            maxWidth: '80vw',
            backgroundColor: '#bee8e7'
          }}
        >
          <Card.Body>
            <Card.Title>
              {title || placeHolderText('Title goes here')}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Set to happen on {date} at {timeTranslator[time]}
            </Card.Subtitle>
            <Card.Text>
              {description || placeHolderText('Description goes here')}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex flex-row justify-content-around mt-5">
        <Calendar
          calendarType="gregory"
          onChange={(value) => {
            setDate(value.toLocaleString().split(',')[0])
            updateBlacklist(value)
          }}
          value={date}
        />

        <div className="d-flex flex-column">
          Times Available:
          <label className="timeRadioLabel">
            <input
              type="radio"
              name="name"
              onClick={() => setTime(8)}
              disabled={blacklist.includes(8)}
            />
            8:00 AM - 10:00 AM
          </label>
          <label className="timeRadioLabel">
            <input type="radio" name="name" onClick={() => setTime(10)} />
            10:00 AM - 12:00 PM
          </label>
          <label className="timeRadioLabel">
            <input type="radio" name="name" onClick={() => setTime(12)} />
            12:00 PM - 2:00 PM
          </label>
          <label className="timeRadioLabel">
            <input type="radio" name="name" onClick={() => setTime(14)} />
            2:00 PM - 4:00 PM
          </label>
          <label className="timeRadioLabel">
            <input type="radio" name="name" onClick={() => setTime(16)} />
            4:00 PM - 6:00 PM
          </label>
        </div>

        <div style={{ width: '25vw' }}>
          <Form.Label>Lesson Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title goes here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Form.Label className="mt-4">Lesson Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows="7"
            placeholder="Describe your lesson here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex mt-4 flex-row justify-content-end">
        <Button
          disabled={
            title === undefined || time === undefined || date === undefined
          }
          onClick={() => {
            createLesson({ title, time, date, description, coachId })
            setPage('lessons')
          }}
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default CreateLessonPage
