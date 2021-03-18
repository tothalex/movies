import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UsersService } from '~modules/users/users.service'
import { UsersController } from '~modules/users/users.controller'
import { rootMongooseTestModule, closeInMongodConnection } from '~test/mocks/mongo.mock'
import { User, UserSchema } from '~modules/users/users.schema'

describe('UsersController', () => {
  let controller: UsersController
  let usersModel: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    usersModel = module.get('UserModel')
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('user should be created', async () => {
    const createdUser = await controller.create({ username: 'tothalex', password: 'tothalex', role: 'basic' })
    expect(createdUser.username).toEqual('tothalex')
    expect(createdUser.role).toEqual('basic')
  })

  it('user creation should be username already exists exception', async () => {
    await usersModel.create({ username: 'tothalex', password: 'tothalex', role: 'basic' })
    try {
      await controller.create({ username: 'tothalex', password: 'tothalex', role: 'basic' })
    } catch (error) {
      expect(error.response).toEqual('Username has been already taken.')
    }
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
