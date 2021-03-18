import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as argon2 from 'argon2'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from '~modules/auth/auth.controller'
import { AuthService } from '~modules/auth/auth.service'
import { rootMongooseTestModule, closeInMongodConnection } from '~test/mocks/mongo.mock'
import { User, UserSchema } from '~modules/users/users.schema'
import { JwtStrategy } from '~modules/auth/auth.jwt-strategy'

describe('AuthController', () => {
  let controller: AuthController
  let usersModel: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({ secret: 'secret' }),
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    usersModel = module.get('UserModel')
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('token should be created', async () => {
    const password = await argon2.hash('tothalex')
    await usersModel.create({ username: 'tothalex', password, role: 'basic' })
    const token = await controller.login({
      username: 'tothalex',
      password: 'tothalex',
    })
    expect(token).toBeDefined()
  })

  it('token creation should be invalid username exception', async () => {
    try {
      await controller.login({
        username: 'invalid-username',
        password: 'invalid-password',
      })
    } catch (error) {
      expect(error.response.message).toEqual('invalid-username')
    }
  })

  it('token creation should be invalid password exception', async () => {
    const password = await argon2.hash('tothalex')
    await usersModel.create({ username: 'tothalex', password, role: 'basic' })
    try {
      await controller.login({
        username: 'tothalex',
        password: 'invalid-password',
      })
    } catch (error) {
      expect(error.response.message).toEqual('invalid-password')
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
