const express = require('express');
const { point } = require('@turf/helpers');

const app = express();
app.use(require('cors')());

const userData = [
  {
    // First user contains properly formatted data
    name: 'Val K.',
    events: [
      {
        date: new Date('2017-06-01'),
        name: 'Reunion',
        // geoJSON feature that contains a point
        location: point([-74.7049476, 40.3483734])
      },
      {
        date: new Date('2017-11-14'),
        name: 'Flight Home',
        // geoJSON feature that contains a point
        location: point([-122.3811494, 37.6213171])
      }
    ]
  },
  {
    // Second user has some malformed data
    name: 'Other User',
    events: [
      {
        date: '2017 13 01', // Invalid date
        name: 'Meeting',
        // `location` is a geoJSON point, not a feature
        location: point([-74.7049476, 40.3483734]).geometry
      }
    ]
  }
]

app.get('/user/:id', (req, res) => {
  const data = userData[req.params.id];
  if (data == null) {
    return res.status(400).json({ message: 'Invalid user id' });
  }
  return res.json(data);
});

app.listen(9000);
console.log('Server started');
