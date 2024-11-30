import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Cart } from "../entities/Cart.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  surname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  age!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  wallet!: number;

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  @JoinColumn()
  cart!: Relation<Cart>;
}
