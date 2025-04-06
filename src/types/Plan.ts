export type TDishTime = 'Завтрак' | 'Обед' | 'Полдник' | 'Ужин';

export type TDiet = {
  dish_id: number;
  dish_time: 'Завтрак' | 'Обед' | 'Полдник' | 'Ужин';
  dish_title: string;
  dish_kcal: number;
  dish_proteins: number;
  dish_fats: number;
  dish_carbs: number;
  dish_desc: string;
};

export type TDietPlan = {
  dish_id: number;
  user_id: number;
  dish_weight: number;
  date: string;
  dish_time: 'Завтрак' | 'Обед' | 'Полдник' | 'Ужин';
  dish_title: string;
  dish_kcal: number;
  dish_proteins: number;
  dish_fats: number;
  dish_carbs: number;
  dish_desc: string;
};

export type TDietPlanTimeItem = {
  dish_id: number;
  dish_weight: number;
  dish_title: string;
  dish_kcal: number;
  dish_proteins: number;
  dish_fats: number;
  dish_carbs: number;
};

export type TDietPlanTime = Record<TDishTime, TDietPlanTimeItem[]>;

export type TDietPlanByDate = Record<string, TDietPlanTime>;

export type TRecipeDiet = {
  dish_id: number;
  recipe_order: number;
  recipe_instruct: string;
  recipe_img: string | null;
};

export type TTraining = {
  training_id: number;
  training_title: string;
  training_desc: string;
  training_user_level: number;
};

export type TTrainingPlan = {
  training_id: number;
  date: string | Date;
  training_title: string;
  training_desc: string;
  training_user_level: number;
};

export type TTrainingInstr = {
  training_id: number;
  training_order: number;
  training_instr: string;
  training_img: string | null;
};

export type TWeightHistory = {
  user_id: number;
  weight: number;
  date: string;
};

export type TWeightHistoryPutRequest = {
  weight: number;
  date: string;
};

export type TTrainingPlanTime = {
  training_id: number;
  training_title: string;
  training_desc: string;
};

export type TSimpleRow = {
  date: Date;
  weekDay: string;
  dateStr: string;
  diet: TDietPlanTime;
  training: TTrainingPlanTime[];
  weight: number;
};

export type TTrainingPlanByDate = Record<string, TSimpleRow>;

export type TTrainingPlanByDateArr = TSimpleRow[];
