import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Cart } from "./Cart.entity.js";
import { Store } from "./Store.entity.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Store, store => store.products)
  store!: Relation<Store>;

  @ManyToOne(() => Cart, cart => cart.products, { nullable: true })
  cart!: Relation<Cart>;
}
