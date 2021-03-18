import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MoviesController } from '~modules/movies/movies.controller'
import { MoviesService } from '~modules/movies/movies.service'
import { rootMongooseTestModule, closeInMongodConnection } from '~test/mocks/mongo.mock'
import { MoviesSchema, Movie } from '~modules/movies/movies.schema'
import { OmdbService } from '~services/omdb.service'
import { getMovieDetails, movieMock, createdMovieMock } from '~test/mocks/omdb.mock'
import { createAuthenticatedUserRequestMock } from '~test/mocks/user.mock'

describe('MoviesController', () => {
  let controller: MoviesController
  let moviesModel: Model<Movie>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: Movie.name, schema: MoviesSchema }])],
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: OmdbService,
          useValue: {
            getMovieDetails,
          },
        },
      ],
    }).compile()

    controller = module.get<MoviesController>(MoviesController)
    moviesModel = module.get('MovieModel')
  })

  const authenticatedUserRequest = createAuthenticatedUserRequestMock()

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('movie should be created', async () => {
    const createdMovie = await controller.create(authenticatedUserRequest, {
      title: 'Harry ',
    })
    expect(createdMovie).toEqual({ ...movieMock, released: new Date(movieMock.released) })
  })

  it('movie creation should be exception', async () => {
    try {
      await controller.create(authenticatedUserRequest, {
        title: '',
      })
    } catch (error) {
      expect(error.status).toEqual(400)
    }
  })

  it('should be one created movie', async () => {
    await new moviesModel({
      ...createdMovieMock,
    }).save()

    const movies = await controller.all(authenticatedUserRequest)
    expect(movies.length).toEqual(1)
  })

  afterAll(async (done) => {
    try {
      await closeInMongodConnection()
      done()
    } catch (error) {
      console.log(error)
    }
  })
})
