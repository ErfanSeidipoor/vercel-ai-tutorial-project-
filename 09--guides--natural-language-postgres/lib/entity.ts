import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unicorns {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  company!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valuation!: number;

  @Column({ type: "varchar", nullable: true })
  date_joined!: string;

  @Column({ type: "date", nullable: true })
  date!: Date;

  @Column("varchar")
  country!: string;

  @Column("varchar")
  city!: string;

  @Column("varchar")
  industry!: string;

  @Column("varchar")
  select_investors!: string;
}
