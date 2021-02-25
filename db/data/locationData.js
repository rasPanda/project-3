export default function getLocationData(users) {
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
    { name: 'Clissold Park',
      image: 'https://live.staticflickr.com/7484/15780807076_272d9cf0d2_b.jpg',
      location: {
        lat: 51.56115461942914,
        long: -0.08622767264339917
      },
      address: 'Clissold Park Mansions, Stoke Newington Church St, Stoke Newington, London N16 9HJ',
      facilities: {
        numberOfTables: 1,
        description: '1 Table in front of Cafe'
      },
      user: users[0],
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
    { name: 'Butterfield Green',
      image: 'https://www.pingengland.co.uk/wp-content/uploads/2018/03/Butterfield-Green-1-1.jpg',
      location: {
        lat: 51.5549611833832,
        long: -0.08063635730193504
      },
      address: '16 Allen Rd, Stoke Newington, London N16 8SD',
      facilities: {
        numberOfTables: 2,
        description: '1 table in the play area and 1 near the bandstand'
      },
      user: users[0],
      comments: [],
      events: []
    },
    { name: 'Central Park',
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
    { name: 'Sutcliffe Park',
      image: 'https://res-1.cloudinary.com/gll/image/upload/c_fit,f_auto,h_330,w_750/v1562948359/outdoor_ahtletics.jpg',
      location: {
        lat: 51.4550,
        long: 0.0304
      },
      address: 'Sutcliffe Park, Meadowside, SE9',
      facilities: {
        numberOfTables: 2,
        description: '2 tables on the approach to the running track'
      },
      user: users[2],
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
    { name: 'Haggerston Park',
      image: 'https://live.staticflickr.com/5763/20791238029_658fa93026_b.jpg',
      location: {
        lat: 51.53289226055541,
        long: -0.06698543031505157
      },
      address: 'Yorkton St, London E2 8NH',
      facilities: {
        numberOfTables: 1,
        description: '1 table near the play area'
      },
      user: users[0],
      comments: [],
      events: []
    },
    {
      name: 'Avery Hill Park',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Avery_Hill_Park_hothouse_%2817767255915%29.jpg',
      location: {
        lat: 51.45029831,
        long: 0.08054373
      },
      address: 'Avery Hill Park, Bexley Road, SE9',
      facilities: {
        numberOfTables: 2,
        description: '2 tables by the cafe'
      },
      user: users[1],
      comments: [],
      events: []
    },
    {
      name: 'Shoreditch Park',
      image: 'https://live.staticflickr.com/5763/20791238029_658fa93026_b.jpg',
      location: {
        lat: 51.53411861856026,
        long: -0.08456587822803766
      },
      address: '188 New N Rd, Hoxton, London N1 5EP',
      facilities: {
        numberOfTables: 2,
        description: '2 tables by the playground'
      },
      user: users[0],
      comments: [],
      events: []
    },
    {
      name: 'Eltham Park South',
      image: 'https://lh3.googleusercontent.com/p/AF1QipMgMBt0-q0VCnwUnMVri3iTrtyTcKSnuRXuc_kz=s1600-w1600',
      location: {
        lat: 51.45511,
        long: 0.06710
      },
      address: 'Eltham Park South, Glenesk Road, SE9',
      facilities: {
        numberOfTables: 2,
        description: '2 tables between the cafe and the tennis courts'
      },
      user: users[1],
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
    { name: 'Shoreditch Park',
      image: 'https://live.staticflickr.com/5605/15619126547_50e597c407_n.jpg',
      location: {
        lat: 51.53411861856026,
        long: -0.08456587822803766
      },
      address: '188 New N Rd, Hoxton, London N1 5EP',
      facilities: {
        numberOfTables: 2,
        description: '2 tables by the playground'
      },
      user: users[0],
      comments: [],
      events: []
    },
    {
      name: 'Charlton Park',
      image: 'https://i2.wp.com/charltonchampion.co.uk/wp-content/uploads/2017/10/20171021-20171021-img_3109.jpg?ssl=1',
      location: {
        lat: 51.480152775139715,
        long: 0.04365161549971284
      },
      address: 'Charlton Park, Charlton Park Road, SE7',
      facilities: {
        numberOfTables: 2,
        description: '2 tables near the outdoor gym'
      },
      user: users[1],
      comments: [],
      events: []
    },
    {
      name: 'Camberwell Green',
      image: 'https://i0.wp.com/www.brixtonbuzz.com/images/camberwell-green-walk-09.jpg?w=735',
      location: {
        lat: 51.474996492246525,
        long: -0.09260894140400495
      },
      address: 'Camberwell, London SE5 7BU',
      facilities: {
        numberOfTables: 1,
        description: '1 table near the play area'
      },
      user: users[0],
      comments: [],
      events: []
    },
    {
      name: 'East Greenwich Pleasance',
      image: 'https://farm5.static.flickr.com/4053/4584247195_36b6769872.jpg',
      location: {
        lat: 51.48470838503629,
        long: 0.013892644469415719
      },
      address: 'East Greenwich Pleasaunce, Chevening Road, SE10',
      facilities: {
        numberOfTables: 1,
        description: '1 table by the Pistachio Cafe'
      },
      user: users[1],
      comments: [],
      events: []
    }
  ]
}