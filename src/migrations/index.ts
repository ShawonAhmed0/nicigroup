import * as migration_20261023_215110_initial from './20261023_215110_initial';
import * as migration_20261026_210000_restore_core_content from './20261026_210000_restore_core_content';

export const migrations = [
  {
    up: migration_20261023_215110_initial.up,
    down: migration_20261023_215110_initial.down,
    name: '20261023_215110_initial'
  },
  {
    up: migration_20261026_210000_restore_core_content.up,
    down: migration_20261026_210000_restore_core_content.down,
    name: '20261026_210000_restore_core_content'
  },
];
