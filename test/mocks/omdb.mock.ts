export const movieMock = {
  title: 'Harry Potter and the Deathly Hallows: Part 2',
  released: '2011-07-14T22:00:00.000+00:00',
  genre: 'Adventure, Drama, Fantasy, Mystery',
  director: 'David Yates',
}

export const createdMovieMock = {
  user: '1',
  title: 'Harry Potter and the Deathly Hallows: Part 2',
  released: '2011-07-14T22:00:00.000Z',
  genre: 'Adventure, Drama, Fantasy, Mystery',
  director: 'David Yates',
  createdAt: 'Wed Mar 17 2021 13:09:36 GMT+0100 (Central European Standard Time)',
  updatedAt: 'Wed Mar 17 2021 13:09:36 GMT+0100 (Central European Standard Time)',
  __v: 0,
}

export const getMovieDetails = jest.fn().mockImplementation((name: string) => {
  if (name.length === 0) {
    throw new Error('Get movies details exception')
  }

  return Promise.resolve({
    ...movieMock,
  })
})
