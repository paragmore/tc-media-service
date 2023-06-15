import "reflect-metadata";
import { Container } from 'inversify';
import { MediaController } from './controllers/media.controller';
import { MediaRepo } from './repo/media.repo';
import { MediaService } from './service/media.service';

const container = new Container();

container.bind<MediaService>(MediaService).toSelf();
container.bind<MediaRepo>(MediaRepo).toSelf();
container.bind<MediaController>(MediaController).toSelf()

export default container;