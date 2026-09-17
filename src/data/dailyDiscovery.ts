import { COMBINATIONS } from './combinations';
import { GAME_OBJECTS } from './objects';
import { Combination, GameObject } from '../types/game';

export interface DailyDiscoveryInfo {
  combination: Combination;
  inputObject1: GameObject;
  inputObject2: GameObject;
  resultObject: GameObject;
  dateKey: string;
}

export function getDailyDiscovery(): DailyDiscoveryInfo | null {
  if (COMBINATIONS.length === 0) return null;
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Deterministic daily pick
  const index = Math.abs((now.getFullYear() * 365 + dayOfYear * 13) % COMBINATIONS.length);
  const combo = COMBINATIONS[index];

  const input1 = GAME_OBJECTS.find(o => o.id === combo.inputs[0]);
  const input2 = GAME_OBJECTS.find(o => o.id === combo.inputs[1]);
  const result = GAME_OBJECTS.find(o => o.id === combo.result);

  if (!input1 || !input2 || !result) return null;

  return {
    combination: combo,
    inputObject1: input1,
    inputObject2: input2,
    resultObject: result,
    dateKey: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  };
}
