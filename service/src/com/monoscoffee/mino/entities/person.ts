import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "person", synchronize: true })
class Person extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "person_id" })
  personId: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;
}

export default Person;
