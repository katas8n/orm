import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Cart } from "./Cart.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  balance!: number;

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  @JoinColumn()
  cart!: Relation<Cart>;
}
