import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  location_id: string;
  @Column({ type: 'float', nullable: false }) latitude: number;
  @Column({ type: 'float', nullable: false }) longitue: number;
  @Column({ type: 'varchar', nullable: false }) address: string;
}
