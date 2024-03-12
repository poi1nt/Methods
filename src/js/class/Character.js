export default class Character  {
    constructor(name, type) {
      const types = ["Bowman", "Swordsman", "Magician", "Daemon", "Undead", "Zombie"];
      if (name.length < 2 || name.length > 10) {
        throw Error("Invalid name for character")
      } else {
        this.name = name;
      }
  
      if (!types.includes(type)) {
        throw Error("Invalid type for character")
      } else {
        this.type = type;
      }
  
      this.health = 100;
      this.level = 1;
  
      this.attack = undefined;
      this.defence = undefined;
    }
  
    levelUp() {
      if (this.health === 0 ) {
        throw Error("Нельзя повысить уровень при здоровье = 0")
      }
  
      this.level += 1;
      this.attack *= 1.2;
      this.defence *= 1.2;
      this.health = 100;
    }
  
    damage(points) {
      if (this.health >= 0 ) {
        let damage = points * (1 - this.defence / 100);
        if (this.health >= damage) {
          this.health -= damage
        } else {
          this.health = 0
        }
      } else {
        this.health = 0
      }
    }
  }