import List from '@modules/lists/infra/typeorm/entities/List';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  list_id: string | null;

  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @Column()
  name: string;

  @Column()
  type?: number;

  @Column()
  status?: boolean;

  @Column('timestamp with time zone')
  date: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
