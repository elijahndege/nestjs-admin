import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import DefaultAdminSite from '../adminSite'
import { injectionTokens } from '../tokens'
import DefaultAdminNunjucksEnvironment from '../admin.environment'
import { DefaultAdminModule } from '..'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('DefaultAdminModule', () => {
  let app: INestApplication

  afterEach(async () => {
    await app.close()
  })

  it('should return the default admin site and environment', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), DefaultAdminModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    const adminSite = app.get(injectionTokens.ADMIN_SITE)
    expect(adminSite).toBeInstanceOf(DefaultAdminSite)

    const adminEnv = app.get(injectionTokens.ADMIN_ENVIRONMENT)
    expect(adminEnv).toBeInstanceOf(DefaultAdminNunjucksEnvironment)
  })
})