export interface ICards {
  cards: card[];
}
export type attacks = {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
};
export type weaknesses = {
  type: string;
  value: string;
};
export type card = {
  id: string;
  name: string;
  nationalPokedexNumber: number;
  imageUrl: string;
  imageUrlHiRes: string;
  types: string[];
  supertype: string;
  subtype: string;
  evolvesFrom: string;
  hp: string;
  retreatCost: string[];
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  attacks: attacks[];
  weaknesses: weaknesses[];
};
