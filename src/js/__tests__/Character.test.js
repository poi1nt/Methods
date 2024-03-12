import Character from '../class/Character'

// Создание персонажа
test.each([
  [1, "Bowman"],
  [2, "Swordsman"],
  [3, "Magician"],
  [4, "Undead"],
  [5, "Zombie"],
  [6, "Daemon"],
])("Тест№%i: Тип %s",
(number, type) => {
  let input = ["Aleksey", type];
  let pers = new Character(...input);
  expect(pers.name).toBe("Aleksey");
  expect(pers.type).toBe(type);
})

test("Тест№7: Некорректное имя персонажа (менее 2 символов)", () =>{
  expect(() => new Character("q", "Bowman")).toThrow()
})

test("Тест№8: Некорректное имя персонажа (более 10 символов)", () =>{
  expect(() => new Character("qweqwrhjqghqbkgqbksa", "Bowman")).toThrow()
})

test("Тест№9: Некорректный тир персонажа", () =>{
  expect(() => new Character("Aleksey", "Meteor")).toThrow()
})

// Создание персонажа с корректными данными
test.each([
  [10, "Bowman", 25, 25],
  [11, "Swordsman", 40, 10],
  [12, "Magician", 10, 40],
  [13, "Undead", 25, 25],
  [14, "Zombie", 40, 10],
  [15, "Daemon", 10, 40],
])("Тест№%i: Тип %s attack: %i, defence: %i",
(number, type, attack, defence) => {
  let input = ["Aleksey"];
  let persClass = require(`../class/${type}.js`)[type];
  let pers = new persClass(...input)
  expect(pers.name).toBe("Aleksey");
  expect(pers.type).toBe(type);
  expect(pers.attack).toBe(attack);
  expect(pers.defence).toBe(defence);
})

test('Тест№16: levelUp увеличивает уровень и изменяет характеристики', () => {
  let character = new (require(`../class/Bowman.js`)["Bowman"])('Aleksey');
  character.levelUp();
  expect(character.level).toBe(2);
  expect(character.attack).toBe(30);
  expect(character.defence).toBe(30);
  expect(character.health).toBe(100);
});

test('Тест№17: Нельзя повысить уровень при здоровье = 0', () => {
  let character = new Character('Aleksey', 'Bowman');
  character.health = 0;
  expect(() => character.levelUp()).toThrow('Нельзя повысить уровень при здоровье = 0');
});

test('Тест№18: Нельзя повысить уровень при здоровье = 0', () => {
  let character = new Character('Aleksey', 'Bowman');
  character.health = 0;
  expect(() => character.levelUp()).toThrow('Нельзя повысить уровень при здоровье = 0');
});

test.each([
  [19, "Bowman", 92.5],
  [20, "Swordsman", 91],
  [21, "Magician", 94],
  [22, "Undead", 92.5],
  [23, "Zombie", 91],
  [24, "Daemon", 94],
])("Тест№%i: Тип %s damage: 10, health after damage: %i",
(number, type, healthAfter) => {
  let input = ["Aleksey"];
  let persClass = require(`../class/${type}.js`)[type];
  let pers = new persClass(...input)
  pers.damage(10);
  expect(pers.health).toBeCloseTo(healthAfter);
})

test('Тест№25: Урон не уменьшает здоровье ниже нуля', () => {
  let character = new Character('Aleksey', 'Bowman');
  character.health = 5;
  character.damage(10);
  expect(character.health).toBe(0);
});

test('Тест№26: Урон не влияет на здоровье, при здоровье < 0', () => {
  let character = new Character('Aleksey', 'Bowman');
  character.health = -5;
  character.damage(10);
  expect(character.health).toBe(0);
});

test('Тест№27: Урон больше текущего здоровья устанавливает здоровье в ноль', () => {
  let character = new Character('Aleksey', 'Bowman');
  character.damage(200);
  expect(character.health).toBe(0);
});