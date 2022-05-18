import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class CreateMessagesTable1642530204098 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.createTable(new Table({
    name: 'messages',
    columns: [
      {
        name: 'uid',
        type: 'UUID',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'description',
        type: 'varchar',
        length: '45',
        isNullable: false,
      },
      {
        name: 'details',
        type: 'varchar',
        length: '150',
        isNullable: false,
      },
      {
      name: 'user_id',
      type: 'UUID',
      isNullable: false,
      },
      {
        name: "created_at",
        type: "timestamp",
        isNullable: false,
      },
      {
        name: "updated_at",
        type: "timestamp",
        isNullable: false,
      }
    ],
    foreignKeys: [
        new TableForeignKey({
          name: "fk_messages_users",
          columnNames: ["user_id"],
          referencedTableName: "users",
          referencedColumnNames: ["uid"],
          onDelete: "CASCADE"
        }),
      ],
  }));
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
