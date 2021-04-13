export default interface ICreateTaskDTO {
  user_id: string;
  list_id?: string | null;
  name: string;
  type: number;
  status: boolean;
  date: Date | null;
}
