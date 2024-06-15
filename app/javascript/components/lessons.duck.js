// this is where the redux for the lessons would be if i had more time. the create would refresh
// state, which is stored, managed and distributed here
// right now, the results are just gotten and thrown into the ether. they'll be fetched on componentDidRender of the other pages

export const lessonsCreateUrl = 'lessons/create'

export const timeTranslator = {
  8: '8:00 AM - 10:00 AM',
  10: '10:00 AM - 12:00 PM',
  12: '12:00 PM - 2:00 PM',
  14: '2:00 PM - 4:00 PM',
  16: '4:00 PM - 6:00 PM'
}

export const createLesson = (body) => {
  const token = document.querySelector('meta[name="csrf-token"]').content
  fetch(lessonsCreateUrl, {
    method: 'POST',
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Network response was not ok.')
    })
    .catch((error) => console.log(error.message))
}
