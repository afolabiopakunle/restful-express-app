const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/json
app.use(bodyParser.json())

const urlencodedParser = bodyParser.urlencoded({ extended: false });

courses = [
    {id: 1, name: 'Course 1', author: 'James Miller'},
    {id: 2, name: 'Course 2', author: 'Afolabi Opakunle'},
    {id: 3, name: 'Course 3', author: 'Tunde Ednut'},
];

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course =  courses.find(course => {
     return course.id === +req.params.id
  } );
  if(!course) res.status(404).send(`Data id ${req.params.id} Not found`);
  res.send(course)
})

app.post('/api/courses', urlencodedParser, (req, res) => {
    // if(!req.body) res.status(404).send('empty data');
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        author: req.body.author,
    }
    courses.push(course);
    res.send(course);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('app listening on port ' + port + '...');
})
