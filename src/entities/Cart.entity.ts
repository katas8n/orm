import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, user => user.cart)
  user!: User;
}
