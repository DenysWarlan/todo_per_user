import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

export const ROUTER_MOCK = {
  navigate: jasmine.createSpy('navigate'),
};
export const PARAM_MOCK = {
  paramMap: of(
    convertToParamMap({
      id: '1',
    })
  ),
};
