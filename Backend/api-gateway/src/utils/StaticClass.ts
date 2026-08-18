export class StaticClass {
  constructor() {
    throw new Error(
      `${new.target.name} is a static class and cannot be instantiated.`,
    );
  }
}
