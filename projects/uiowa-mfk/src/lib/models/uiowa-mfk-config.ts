import { InjectionToken } from '@angular/core';

interface UiowaMfkConfig {
  favoriteMfksApiUrl: string;
}

const ConfigToken = new InjectionToken<UiowaMfkConfig>('config');

export { UiowaMfkConfig, ConfigToken };
