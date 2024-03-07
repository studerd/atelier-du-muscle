import { CardHeaderConfig } from './card-header-config.interface';

export interface CardConfig {
  headerConfig?: CardHeaderConfig;
  css?: string;
}

export const CardDefaultConfig={
  css: 'default'
}