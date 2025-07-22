import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { ngMocks } from 'ng-mocks'

beforeEach(() => ngMocks.reset());
setupZoneTestEnv();