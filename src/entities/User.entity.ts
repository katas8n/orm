import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  surname!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  age!: number;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  wallet!: number;

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  @JoinColumn()
  cart!: Cart;
}
