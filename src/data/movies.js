export const movies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    rating: 8.2,
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "3h 12m",
    language: ["English", "Hindi"],
    releaseDate: "2022-12-16",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    trailer: "https://www.youtube.com/embed/d9MyW72ELq0",
    nowShowing: true
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    rating: 7.8,
    genre: ["Action", "Adventure", "Drama"],
    duration: "2h 41m",
    language: ["English", "Hindi"],
    releaseDate: "2022-11-11",
    description: "The people of Wakanda fight to protect their home from intervening world powers.",
    trailer: "https://www.youtube.com/embed/_Z3QKkl1WyM",
    nowShowing: true
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    rating: 8.9,
    genre: ["Action", "Drama"],
    duration: "2h 10m",
    language: ["English", "Hindi"],
    releaseDate: "2022-05-27",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    trailer: "https://www.youtube.com/embed/qSqVVswa420",
    nowShowing: true
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    rating: 8.7,
    genre: ["Action", "Adventure", "Fantasy"],
    duration: "2h 28m",
    language: ["English", "Hindi"],
    releaseDate: "2021-12-17",
    description: "Spider-Man seeks help from Doctor Strange to restore his secret identity.",
    trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
    nowShowing: false
  },
  {
    id: 5,
    title: "The Batman",
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/qi6Edc1OHscyENecGtz8TF0j5Ch.jpg",
    rating: 8.1,
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 56m",
    language: ["English", "Hindi"],
    releaseDate: "2022-03-04",
    description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
    nowShowing: false
  }
];

export const theatres = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Phoenix Mall",
    shows: [
      { time: "10:00 AM", price: 150, available: true, type: "morning" },
      { time: "1:30 PM", price: 200, available: true, type: "afternoon" },
      { time: "4:45 PM", price: 250, available: false, type: "afternoon" },
      { time: "8:00 PM", price: 300, available: true, type: "night" },
      { time: "11:15 PM", price: 250, available: true, type: "night" }
    ]
  },
  {
    id: 2,
    name: "INOX",
    location: "City Center Mall",
    shows: [
      { time: "9:30 AM", price: 140, available: true, type: "morning" },
      { time: "12:45 PM", price: 190, available: true, type: "afternoon" },
      { time: "4:00 PM", price: 240, available: true, type: "afternoon" },
      { time: "7:30 PM", price: 290, available: false, type: "night" },
      { time: "10:45 PM", price: 240, available: true, type: "night" }
    ]
  },
  {
    id: 3,
    name: "Cinepolis",
    location: "DLF Mall",
    shows: [
      { time: "11:00 AM", price: 160, available: true, type: "morning" },
      { time: "2:15 PM", price: 210, available: true, type: "afternoon" },
      { time: "5:30 PM", price: 260, available: true, type: "afternoon" },
      { time: "8:45 PM", price: 310, available: true, type: "night" }
    ]
  }
];

export const seatLayout = {
  silver: {
    rows: ['A', 'B', 'C', 'D'],
    seatsPerRow: 12,
    price: 150
  },
  gold: {
    rows: ['E', 'F', 'G', 'H'],
    seatsPerRow: 10,
    price: 200
  },
  platinum: {
    rows: ['I', 'J'],
    seatsPerRow: 8,
    price: 300
  }
};