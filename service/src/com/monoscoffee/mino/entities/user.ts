import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  Unique,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import Person from "./person";

@Unique(["username", "mail"])
@Entity({ name: "user", synchronize: true })
class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  public userId: number;

  @Column({ name: "username" })
  public username: number;

  @Column({ name: "mail" })
  public mail: string;

  @Column({ name: "password" })
  public password: string;

  @Column({ name: "ref" })
  public ref: string;

  @Column({ name: "last_login" })
  public lastLogin: Date;

  @Column({ name: "registered_at" })
  public registeredAt: Date;

  @OneToOne((type) => Person, { eager: true, cascade: ["update", "insert"] })
  @JoinColumn({ name: "person_id", referencedColumnName: "personId" })
  public person: Person;

  @Column({ name: "registerType" })
  public registerType: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
