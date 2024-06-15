# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Coach.create(
  firstName: "Albert",
  lastName: 'Ainstain',
  introduction: 'Albert is a teacher that specializes in physics, having invented the theory of...something or another',
  phone: '2121111111'
)
Coach.create(
  firstName: "Bob",
  lastName: 'Barley',
  introduction: 'Bob is a world renown builder who shines in both the art of architecture and singing.',
  phone: '2122222222'

)

Student.create(
  firstName: "Craig",
  lastName: 'Cranberry',
  phone: '2123333333'

)
Student.create(
  firstName: "Derek",
  lastName: 'Donut',
  phone: '2124444444'

)
Student.create(
  firstName: "Eggbert",
  lastName: 'Eggplant',
  phone: '2125555555'

)

Lesson.create(
  title: "Albert's phantastic phenomonal physics phuntime",
  description: "phun physics phor everyone! once a year!",
  coachId: 1,
  date: '1/20/2025',
  time: 8,
)

Lesson.create(
  title: "Albert's phenomonal physics phuntime",
  description: "phun physics phor everyone! once a year!",
  notes: 'double the physics, 8x the phun! its exponential now!',
  score: 10,
  coachId: 1,
  studentId: 1,
  date: '1/20/2024',
  time: 8
)

Lesson.create(
  title: "Albert's physics phuntime",
  description: "phun physics phor everyone! once a year!",
  notes: 'was phun, so so phun',
  score: 5,
  coachId: 1,
  studentId: 1,
  date: '1/20/2023',
  time: 8
)