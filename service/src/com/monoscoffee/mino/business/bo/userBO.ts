import { DefaultDAO } from "../core/dao/defaultDAO";
import User from "../../entities/user";
import { getRepository } from "typeorm";
import Person from "../../entities/person";

export class UserBO extends DefaultDAO {
  constructor() {
    super();
  }

  public async checkUserCredentials(
    enrollment: string,
    password: string
  ): Promise<User | null> {
    console.log({ enrollment, password });
    const userRepository = getRepository(User);
    let user: User = null;
    try {
      user = await userRepository.findOneOrFail({
        where: { enrollment, password },
      });
    } catch (error) {
      return null;
    }
    return user;
  }

  public async findByRef(ref: number): Promise<User | null> {
    const userRepository = getRepository(User);
    let user: User = null;
    try {
      user = await userRepository.findOneOrFail({
        where: { ref },
      });
    } catch (error) {
      return null;
    }
    return user;
  }

  public async findByPersonId(id: number): Promise<User | null> {
    const userRepository = getRepository(User);
    const personRepository = getRepository(Person);
    let user: User = null;
    let person: Person = null;
    try {
      person = await personRepository.findOneOrFail({
        where: { personId: id },
      });
      user = await userRepository.findOneOrFail({ where: { person: person } });
    } catch (error) {
      return null;
    }
    return user;
  }
}
