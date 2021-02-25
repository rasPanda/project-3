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
      image: 'https://res.cloudinary.com/dzoqli241/image/upload/v1614098680/wgk8bo513y4zwrf62cww.jpg',
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
      image: 'https://res.cloudinary.com/dzoqli241/image/upload/v1614177765/dekjrealrdmdmgj9s8bv.jpg',
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
      image: 'https://images.unsplash.com/photo-1572025442937-d55974d9815f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80',
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
      image: 'https://res.cloudinary.com/dzoqli241/image/upload/v1614177703/iqctyqiv9p7npiowaqjt.jpg',
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
    },
    {
      name: 'Regents Park',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Regent%27s_Park_bandstand.jpg',
      location: {
        lat: 51.5289041304773,
        long: -0.15405130307000162
      },
      address: 'York Bridge Road, NW1',
      facilities: {
        numberOfTables: 1,
        description: '1 table near to the Will to Win tennis courts'
      },
      user: users[5],
      comments: [],
      events: []
    },
    {
      name: 'Paddington Recreation Ground',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Pavilion%2C_Paddington_Recreation_Ground_-_geograph.org.uk_-_530411.jpg',
      location: {
        lat: 51.53001412812487,
        long: -0.1910337451534186
      },
      address: 'Maida Vale, W9',
      facilities: {
        numberOfTables: 2,
        description: '2 tables near the tennis courts'
      },
      user: users[6],
      comments: [],
      events: []
    },
    {
      name: 'Central Park',
      image: 'https://www.u-la.com/wp-content/uploads/2017/01/Central-Park-Newham_-61-smaller-square.jpg',
      location: {
        lat: 51.529097204590556, 
        long: 0.0524200674727445
      },
      address: 'High Street South, E6',
      facilities: {
        numberOfTables: 2,
        description: '2 tables near the tennis courts'
      },
      user: users[7],
      comments: [],
      events: []
    },
    {
      name: 'New Beckton Park',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/05/59/60/60/new-beckton-park.jpg',
      location: {
        lat: 51.51089142545319,  
        long: 0.05850973670276127
      },
      address: 'Savage Gardens, E6',
      facilities: {
        numberOfTables: 2,
        description: '2 tables within the redeveloped play area'
      },
      user: users[10],
      comments: [],
      events: []
    },
    {
      name: 'Stratford Park',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/72/cc/33/stratford-park.jpg',
      location: {
        lat: 51.53837518017357,   
        long: 0.006914027432348728
      },
      address: 'Densford Road, E15',
      facilities: {
        numberOfTables: 1,
        description: '1 table by the fountain & 1 by the play area'
      },
      user: users[8],
      comments: [],
      events: []
    },
  ]
}