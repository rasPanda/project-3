export default function getLocationData(users, event) {
  return [
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
      events: []
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
      events: []
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
      events: []
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
      events: []
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
      events: []
    }
  ]
}