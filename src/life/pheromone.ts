import { Field } from "./field";

export class PheromoneField extends Field {
  maxValues = new Field(this.garden);

  repelPheromone(index: number, strength: number) {
    this.maxValues.data[index] = this.maxValues.data[index] / strength;
    this.data[index] = this.data[index] / strength;

    this.maxValues.data[index - 1] = this.maxValues.data[index - 1] / strength;
    this.data[index - 1] = this.data[index - 1] / strength;

    this.maxValues.data[index + 1] = this.maxValues.data[index + 1] / strength;
    this.data[index + 1] = this.data[index + 1] / strength;

    this.maxValues.data[index - this.height] =
      this.maxValues.data[index - this.height] / strength;
    this.data[index - this.height] = this.data[index - this.height] / strength;

    this.maxValues.data[index + this.height] =
      this.maxValues.data[index + this.height] / strength;
    this.data[index + this.height] = this.data[index + this.height] / strength;
  }

  dropPheromone(index: number, value: number, max: number) {
    this.maxValues.data[index] = Math.max(max, this.maxValues.data[index]);
    if (this.data[index] > max) {
      return;
    }
    // this.data[index] = Math.max(0, this.data[index] + value);
    this.data[index] = Math.max(0, this.data[index] + value);
    // this.spreadPheromone(index, value);
    // this.data[index] = this.maxValues.data[index];
  }

  spreadPheromone(index: number, value: number) {
    this.data[index - 1] = Math.max(
      0,
      Math.min(this.maxValues.data[index - 1], this.data[index - 1] + value / 4)
    );
    this.data[index + 1] = Math.max(
      0,
      Math.min(this.maxValues.data[index + 1], this.data[index + 1] + value / 4)
    );
    this.data[index - this.height] = Math.max(
      0,
      Math.min(
        this.maxValues.data[index - this.height],
        this.data[index - this.height] + value / 4
      )
    );
    this.data[index + this.height] = Math.max(
      0,
      Math.min(
        this.maxValues.data[index + this.height],
        this.data[index + this.height] + value / 4
      )
    );
  }
}
