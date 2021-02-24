import User from '../../models/user.js'
import Location from '../../models/location.js'
import Event from '../../models/event.js'
export default async function setup(done) {
  try {
    const users = await User.create([
      {
        username: 'joe',
        email: 'joe@joe.com',
        password: 'joe',
        passwordConfirmation: 'joe',
        isAdmin: true,
        image: 'https://joesface.com',
        bio: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        location: 'Bristol'
      },
      {
        username: 'yusuf',
        email: 'yusuf@yusuf.com',
        password: 'yusuf',
        passwordConfirmation: 'yusuf',
        isAdmin: true,
        image: 'https://yusufsface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'Brick Lane'
      },
      {
        username: 'carl',
        email: 'carl@carl.com',
        password: 'carl',
        passwordConfirmation: 'carl',
        isAdmin: true,
        image: 'https://carlsface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'London'
      },
      {
        username: 'james',
        email: 'james@james.com',
        password: 'james',
        passwordConfirmation: 'james',
        isAdmin: true,
        image: 'https://jamesface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'London'
      },
      {
        username: 'bill',
        email: 'bill@bill.com',
        password: 'bill',
        passwordConfirmation: 'bill',
        image: 'https://billsface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'New York'
      },
      {
        username: 'sarah',
        email: 'sarah@sarah.com',
        password: 'sarah',
        passwordConfirmation: 'sarah',
        image: 'https://sarahsface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'Edinburgh'
      },
      {
        username: 'patrick',
        email: 'patrick@patrick.com',
        password: 'patrick',
        passwordConfirmation: 'patrick',
        isAdmin: false,
        image: 'https://patricksface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'Dublin'
      },
      {
        username: 'beth',
        email: 'beth@beth.com',
        password: 'beth',
        passwordConfirmation: 'beth',
        isAdmin: false,
        image: 'https://bethsface.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        location: 'Kings Lynn'
      }
    ])
    const location = await Location.create([
      {
        name: 'Burgess Park Chumleigh Gardens Playground',
        image: 'https://bestoutdoorpingpongtables.com/wp-content/uploads/2017/02/Cornilleau-Park-Outdoor.jpg',
        location: {
          lat: 51.483856,
          long: -0.084035
        },
        address: 'Chumleigh Gardens, SE5 0RJ',
        facilities: {
          numberOfTables: 3,
          description: 'Three permanent tables located amoungst the play equipment in Chumleigh Playground in Burgess Park.'
        },
        user: users[0],
        comments: [],
        events: {}
      },
      {
        name: 'Burgess Park Football Pitch',
        image: 'https://bestoutdoorpingpongtables.com/wp-content/uploads/2017/02/Cornilleau-Park-Outdoor.jpg',
        location: {
          lat: 51.48381979870768,
          long: -0.07752475562416844
        },
        address: '89 Cobourg Rd, SE5 0JB',
        facilities: {
          numberOfTables: 2,
          description: 'Two tables located outside of Burgess Park Sports Centre, next to the football pitches.'
        },
        user: users[0],
        comments: [],
        events: {}
      },
      {
        name: 'Fordham Park',
        image: 'https://bestoutdoorpingpongtables.com/wp-content/uploads/2017/02/Cornilleau-Park-Outdoor.jpg',
        location: {
          lat: 51.478314,
          long: -0.034986
        },
        address: 'Pagnell Street, SE14 6AY',
        facilities: {
          numberOfTables: 2,
          description: '2 Permanent Tables'
        },
        user: users[1],
        comments: [],
        events: {}
      },
      {
        name: 'Deptford Park',
        image: 'https://bestoutdoorpingpongtables.com/wp-content/uploads/2017/02/Cornilleau-Park-Outdoor.jpg',
        location: {
          lat: 51.487237,
          long: -0.039467
        },
        address: 'Scawen Road, SE8 5AG',
        facilities: {
          numberOfTables: 1,
          description: '1 table next to basketball court abd playground'
        },
        user: users[1],
        comments: [],
        events: {}
      },
      {
        name: 'Folkestone Gardens',
        image: 'https://bestoutdoorpingpongtables.com/wp-content/uploads/2017/02/Cornilleau-Park-Outdoor.jpg',
        location: {
          lat: 51.48309452004964,
          long: -0.039833118796243544
        },
        address: 'Rolt Street, SE8 5NN',
        facilities: {
          numberOfTables: 1,
          description: '1 Permanent Table'
        },
        user: users[2],
        comments: [],
        events: {}
      }
    ])
    await Event.create([
      {
        name: 'Ball Busters',
        location: location[0],
        user: users[0],
        image: 'https://images.unsplash.com/photo-1557804500-7a58fbcd4d1a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        time: ' Sunday 21st March at 3pm',
        details: 'meeting at the south corner of sweet park',
        attendees: [users[1], users[2]],
        comments: []
      },
      {
        name: 'King Pong',
        location: location[1],
        user: users[1],
        image: 'https://images.unsplash.com/photo-1568711146297-b8674c3c11b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        time: 'Saturday 20th March at 3pm',
        details: 'meeting at the near pub,  then walking  to the spot ',
        attendees: [users[3], users[4], users[5]],

        comments: []
      },
      {
        name: 'Ping Pongthers',
        location: location[2],
        user: users[2],
        image: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        time: 'Tuesday 24th March 6:30pm',
        details: 'meeting at the main gate, buying drink and start palying',
        attendees: [users[1], users[2], users[5]],
        comments: []
      },
      {
        name: 'Total Pongage',
        location: location[3],
        user: users[3],
        image: 'https://images.unsplash.com/photo-1576617497557-22895ee5930b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        time: ' Thursday 18th March at 8pm',
        details: 'meeting at the main gate, buying drink and start palying',
        attendees: [users[4], users[6], users[7]],
        comments: []
      },
      {
        name: 'Miss Hits',
        location: location[4],
        user: users[5],
        image: 'https://images.unsplash.com/photo-1572025442937-d55974d9815f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80',
        time: 'Thursday 18th March at 8pm',
        details: 'meeting at the main gate, buying drink and start palying',
        attendees: [users[1], users[2]],
        comments: []
      },
      {
        name: 'Green park, London',
        location: location[4],
        user: users[4],
        image: 'https://images.unsplash.com/photo-1559077184-562609f0a10b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
        time: 'Saturday 27th March at 3pm',
        details: 'meeting at the near pub,  then walking  to the spot',
        attendees: [users[0], users[4]],
        comments: []
      }
    ])
    done()
  } catch (err) {
    console.log(err)
  }
  
}