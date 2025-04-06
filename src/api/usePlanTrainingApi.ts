import type {
  GetItemRequest,
  GetItemResponse,
  GetListResponse,
  TDiet,
  TDietPlan,
  TRecipeDiet,
  TTraining,
  TTrainingInstr,
  TTrainingPlan,
  TWeightHistory,
  TWeightHistoryPutRequest,
} from '@/types';
import useBaseApi from './base/useBaseApi';
import { getDietPlanMock } from './mocks/getDietPlanMock';
import { getRecipeDietMock } from './mocks/getRecipeDietMock';
import { getTrainingPlanMock } from './mocks/getTrainingPlanMock';
import { getTrainingInstrMock } from './mocks/getTrainingInstrMock';
import { getWeightHistoryMock } from './mocks/getWeightHistoryMock';
import { getTrainingMock } from './mocks/getTrainingMock';
import { getDietMock } from './mocks/getDietMock';

export default () => {
  const { put } = useBaseApi();

  const getDiet = async (
    params: GetItemRequest,
  ): Promise<GetItemResponse<TDiet>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getDietMock()));
    // return await get('/v1/training-plan', params);
  };

  const getDietPlan = async (params?: {
    date: string;
  }): Promise<GetListResponse<TDietPlan>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getDietPlanMock()));
    // return await get('/v1/diet-plan', params);
  };

  // Овсянка  https://1000.menu/cooking/70531-ovsyanaya-kasha-na-vode-i-moloke
  //   КИсель https://eda.ru/recepty/napitki/kisel-124995

  const getRecipeDiet = async (
    params: GetItemRequest,
  ): Promise<GetItemResponse<TRecipeDiet[]>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getRecipeDietMock()));
    // return await get('/v1/recipeD-diet', params);
  };

  const getTraining = async (
    params: GetItemRequest,
  ): Promise<GetItemResponse<TTraining>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getTrainingMock()));
    // return await get('/v1/training-plan', params);
  };

  const getTrainingPlan = async (params?: {
    date: string;
  }): Promise<GetListResponse<TTrainingPlan>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getTrainingPlanMock()));
    // return await get('/v1/training-plan', params);
  };

  const getTrainingInstr = async (
    params: GetItemRequest,
  ): Promise<GetItemResponse<TTrainingInstr[]>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getTrainingInstrMock()));
    // return await get('/v1/training-instr', params);
  };

  const getWeightHistory = async (params?: {
    date: string;
  }): Promise<GetListResponse<TWeightHistory>> => {
    console.log('params', params);
    return new Promise((resolve) => resolve(getWeightHistoryMock()));
    // return await get('/v1/weight-history', params);
  };

  const changeWeightHistory = async (
    params: TWeightHistoryPutRequest,
  ): Promise<GetItemResponse<boolean>> => {
    return await put('/v1/weight-history', params);
  };

  return {
    getDiet,
    getDietPlan,
    getRecipeDiet,
    getTraining,
    getTrainingPlan,
    getTrainingInstr,
    getWeightHistory,
    changeWeightHistory,
  };
};
