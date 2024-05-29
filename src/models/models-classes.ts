export class PaginatedResult<T> {
  count: number;
  items: T;
}

export class NbSimpleTableParams<T> {
  currentPage;
  readonly PAGE_SIZE: number;
  filter: T;
  orderBy: string;
  desc: boolean;
  doQuery: () => void;
  doDelete: (e: unknown) => void;
}

export class SelectItemDTO<T> {
  label: string;
  sublabel: string;
  value: T;
  disabled: boolean;
}

export class TreeNodeDTO<T> {
  id: number;
  node: T;
  children: TreeNodeDTO<T>[];
}

export class TestMailResultDTO {
  result: boolean;
  error: string;
}

/************ User ************/
export class UserDTO {
  id: string;
  email: string;
  dietType: DietType;
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: Gender;
  enrollmentDate: Date;
  basalMetabolism: number;
  dietObjective: DietObjective;
}

export enum DietType {
  Carnivore,
  Omnivore,
  Paleo,
  Vegan,
  Vegetarian,
  Mediterranean,
}

export enum Gender {
  Male,
  Female,
}

export enum DietObjective {
  GainWeight,
  LoseWeight,
  MantainWeight,
}

/************ End User ************/

/************ Routines ************/

export class DailyRoutineDTO {
  id: number;
  date: Date;
  exerciseType: ExerciseType;
  userId: string;
  user: UserDTO;
  exercises: ExerciseDTO[];
}

export enum ExerciseType {
  Leg,
  Gluteus,
  Back,
  Chest,
  Arm,
  Cardio,
}

export class ExerciseDTO {
  id: number;
  name: string;
  dailyRoutineId: number;
}

/********** End routines *************/

/************ Routines ************/

export class DailyDietDTO {
  id: number;
  date: Date;
  dietType: DietType;
  userId: string;
  user: UserDTO;
  meals: MealDTO[];
}

export class MealDTO {
  id: number;
  name: string;
  firstPlate: string;
  secondPlate: string;
  dessert: string;
  dailyDietId: number;
}

/********** End routines *************/
