import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTasks1617816650987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'list_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'int',
            default: 1,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TaskUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TaskList',
            referencedTableName: 'lists',
            referencedColumnNames: ['id'],
            columnNames: ['list_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
