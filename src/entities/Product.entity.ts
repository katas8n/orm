import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./Store.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Store, store => store.products)
  store!: Store;
}
