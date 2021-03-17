import { Module, HttpModule } from '@nestjs/common'

import { OmdbService } from '~services/omdb.service'

@Module({
  imports: [HttpModule],
  providers: [OmdbService],
  exports: [OmdbService],
})
export class ServicesModule {}
