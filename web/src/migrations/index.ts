import * as migration_20251019_211133 from './20251019_211133';

export const migrations = [
  {
    up: migration_20251019_211133.up,
    down: migration_20251019_211133.down,
    name: '20251019_211133'
  },
];
