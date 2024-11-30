import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./Product.entity.js";
import { User } from "./User.entity.js";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, user => user.cart)
  user!: Relation<User>;

  @OneToMany(() => Product, product => product.cart, { cascade: true })
  products!: Relation<Product[]>;
}
