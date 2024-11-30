import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Cart } from "./Cart.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  @JoinColumn()
  cart!: Relation<Cart>;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance!: number;
}
