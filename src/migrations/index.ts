import * as migration_20261023_215110_initial from './20261023_215110_initial';

export const migrations = [
  {
    up: migration_20261023_215110_initial.up,
    down: migration_20261023_215110_initial.down,
    name: '20261023_215110_initial'
  },
];
