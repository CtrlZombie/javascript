const game = {
  isAttacking: false,
  currentEnemy: null,
  gameOver: false,
  player: {
    name: "Пупа",
    health: 100,
    maxHealth: 100,
    level: 1,
    experience: 0,
    nextLevelExp: 100,
    inventory: ["Кофе", "Бутерброд"],
    baseAttack: 10,
    attack: function () {
      return Math.floor(this.baseAttack + Math.random() * 10);
    },
    heal: function (amount) {
      this.health = Math.min(this.health + amount, this.maxHealth);
      updatePlayerStats();
      addToLog(`Пупа восстановил ${amount} здоровья!`);
    },
    addExperience: function (exp) {
      this.experience += exp;
      if (this.experience >= this.nextLevelExp) {
        this.levelUp();
      }
      updatePlayerStats();
    },
    levelUp: function () {
      this.level++;
      this.maxHealth += 20;
      this.health = this.maxHealth;
      this.baseAttack += 5;
      this.experience -= this.nextLevelExp;
      this.nextLevelExp = Math.floor(this.nextLevelExp * 1.5);
      addToLog(`Пупа достиг уровня ${this.level}! Здоровье и атака увеличены.`);
      updatePlayerStats();
    },
  },
  locations: [
    {
      name: "Офис",
      description:
        "Пупа понимает: зарплата не пришла! Нужно идти в бухгалтерию.",
      enemy: null,
      nextLocations: ["Зона отдыха"],
    },
    {
      name: "Зона отдыха",
      description:
        "Здесь можно передохнуть, но сначала нужно разобраться с коллегой.",
      enemy: "Коллега душнила",
      nextLocations: ["Коридор"],
    },
    {
      name: "Коридор",
      description:
        "Длинный коридор, ведущий в бухгалтерию. Но сначала нужно пройти уборщицу.",
      enemy: "Уборщица",
      nextLocations: ["Бухгалтерия"],
    },
    {
      name: "Бухгалтерия",
      description: "Последний рубеж. Здесь сидит грозная бухгалтерша.",
      enemy: "Бухгалтерша",
      nextLocations: [],
    },
  ],
  enemies: {
    "Коллега душнила": {
      name: "Коллега душнила",
      health: 30,
      maxHealth: 30,
      attacks: [
        { name: "Рассказывает, как провел выходные", damage: 8 },
        { name: "Показывает фотки с отпуска", damage: 12 },
      ],
      attack: function () {
        const attack =
          this.attacks[Math.floor(Math.random() * this.attacks.length)];
        return {
          text: `${this.name} : "${attack.name}"! (Урон: ${attack.damage})`,
          damage: attack.damage,
        };
      },
      expReward: 60,
    },
    Уборщица: {
      name: "Уборщица",
      health: 40,
      maxHealth: 40,
      attacks: [
        { name: "Орёт, что только помыла полы", damage: 10 },
        { name: "Хлещет тряпкой по лицу", damage: 15 },
      ],
      attack: function () {
        const attack =
          this.attacks[Math.floor(Math.random() * this.attacks.length)];
        return {
          text: `${this.name} : "${attack.name}"! (Урон: ${attack.damage})`,
          damage: attack.damage,
        };
      },
      expReward: 90,
    },
    Бухгалтерша: {
      name: "Бухгалтерша",
      health: 50,
      maxHealth: 50,
      attacks: [
        { name: "Придите позже", damage: 15 },
        { name: "Я сейчас занята", damage: 20 },
      ],
      attack: function () {
        const attack =
          this.attacks[Math.floor(Math.random() * this.attacks.length)];
        return {
          text: `${this.name} : "${attack.name}"! (Урон: ${attack.damage})`,
          damage: attack.damage,
        };
      },
      expReward: 150,
    },
  },
  currentLocationIndex: 0,
  currentEnemy: null,
  gameOver: false,
};

const elements = {
  playerHealth: document.getElementById("player-health"),
  playerHealthBar: document.getElementById("player-health-bar"),
  playerLevel: document.getElementById("player-level"),
  playerInventory: document.getElementById("player-inventory"),
  locationName: document.getElementById("location-name"),
  locationDescription: document.getElementById("location-description"),
  enemyContainer: document.getElementById("enemy-container"),
  enemyName: document.getElementById("enemy-name"),
  enemyHealth: document.getElementById("enemy-health"),
  enemyHealthBar: document.getElementById("enemy-health-bar"),
  enemyAttackText: document.getElementById("enemy-attack-text"),
  moveActions: document.getElementById("move-actions"),
  combatActions: document.getElementById("combat-actions"),
  gameLog: document.getElementById("game-log"),
  resetBtn: document.getElementById("reset-btn"),
  moveButtons: [
    document.getElementById("move-1"),
    document.getElementById("move-2"),
    document.getElementById("move-3"),
  ],
  attackBtn: document.getElementById("attack-btn"),
  useItemBtn: document.getElementById("use-item-btn"),
  runBtn: document.getElementById("run-btn"),
};

function initGame() {
  updatePlayerStats();
  updateLocation();
  setupEventListeners();
  addToLog("Игра началась! Пупа отправляется в бухгалтерию за зарплатой.");
  updateButtons();
}

function updatePlayerStats() {
  elements.playerHealth.textContent = game.player.health;
  elements.playerHealthBar.style.width = `${
    (game.player.health / game.player.maxHealth) * 100
  }%`;
  elements.playerLevel.textContent = game.player.level;
  elements.playerInventory.textContent = game.player.inventory.join(", ");
}

function updateLocation() {
  const location = game.locations[game.currentLocationIndex];
  elements.locationName.textContent = location.name;
  elements.locationDescription.textContent = location.description;

  updateButtons();

  if (location.enemy && !game.currentEnemy) {
    startCombat(location.enemy);
  }
}

function updateButtons() {
  const hasEnemy = game.currentEnemy && game.currentEnemy.health > 0;

  elements.moveButtons.forEach((btn, index) => {
    btn.disabled = index !== game.currentLocationIndex;
  });

  elements.attackBtn.disabled = !hasEnemy;
  elements.useItemBtn.disabled = !hasEnemy;
  elements.runBtn.disabled = !hasEnemy;

  elements.moveActions.classList.toggle("hidden", hasEnemy);
  elements.combatActions.classList.toggle("hidden", !hasEnemy);
}

function startCombat(enemyName) {
  elements.enemyAttackText.textContent = "";
  elements.enemyAttackText.classList.remove("enemy-attack");

  game.currentEnemy = Object.assign({}, game.enemies[enemyName]);
  elements.enemyName.textContent = game.currentEnemy.name;
  updateEnemyStats();
  elements.enemyContainer.classList.remove("hidden");

  elements.moveActions.classList.add("hidden");
  elements.combatActions.classList.remove("hidden");
  elements.attackBtn.disabled = false;
  elements.useItemBtn.disabled = false;
  elements.runBtn.disabled = false;

  addToLog(`Появился ${game.currentEnemy.name}! Приготовьтесь к бою!`);
}

function updateEnemyStats() {
  const health = Math.max(0, game.currentEnemy.health);
  elements.enemyHealth.textContent = health;
  elements.enemyHealthBar.style.width = `${
    (health / game.currentEnemy.maxHealth) * 100
  }%`;
}

function endCombat() {
  elements.enemyAttackText.textContent = "";
  elements.enemyAttackText.classList.remove("enemy-attack");

  game.currentEnemy = null;
  elements.enemyContainer.classList.add("hidden");

  elements.moveActions.classList.remove("hidden");
  elements.combatActions.classList.add("hidden");
  elements.attackBtn.disabled = true;
  elements.useItemBtn.disabled = true;
  elements.runBtn.disabled = true;
}

function playerAttack() {
  if (game.gameOver || !game.currentEnemy || game.isAttacking) return;

  game.isAttacking = true;
  elements.attackBtn.disabled = true;

  const damage = game.player.attack();
  game.currentEnemy.health = Math.max(0, game.currentEnemy.health - damage);
  updateEnemyStats();
  addToLog(`Пупа атакует и наносит ${damage} урона!`);

  if (game.currentEnemy.health <= 0) {
    enemyDefeated();
    game.isAttacking = false;
    return;
  }

  setTimeout(() => {
    enemyAttack();
    game.isAttacking = false;
    elements.attackBtn.disabled = false;
  }, 500);
}

function enemyAttack() {
  if (game.gameOver || !game.currentEnemy) return;

  elements.enemyAttackText.textContent = "";

  const attack = game.currentEnemy.attack();
  game.player.health -= attack.damage;

  updatePlayerStats();
  elements.enemyAttackText.textContent = attack.text;

  elements.enemyAttackText.classList.add("enemy-attack");
  setTimeout(() => {
    elements.enemyAttackText.classList.remove("enemy-attack");
  }, 300);

  addToLog(attack.text);

  if (game.player.health <= 0) {
    gameOver();
  }
}

function enemyDefeated() {
  const exp = game.currentEnemy.expReward;
  addToLog(`Пупа победил ${game.currentEnemy.name} и получает ${exp} опыта!`);
  game.player.addExperience(exp);

  elements.attackBtn.disabled = true;
  elements.useItemBtn.disabled = true;
  elements.runBtn.disabled = true;

  endCombat();

  if (game.currentLocationIndex === game.locations.length - 1) {
    victory();
  }
}

function useItem() {
  if (game.player.inventory.length === 0) {
    addToLog("У Пупы нет предметов для использования!");
    return;
  }

  const item = game.player.inventory[0];
  game.player.inventory.shift();
  game.player.heal(15);
  updatePlayerStats();
  addToLog(`Пупа использует ${item} и восстанавливает здоровье!`);

  if (game.currentEnemy) {
    setTimeout(enemyAttack, 1000);
  }
}

function tryRun() {
  if (!game.currentEnemy) return;

  const success = Math.random() < 0.01;
  if (success) {
    addToLog("Пупа успешно сбежал от врага!");
    endCombat();
  } else {
    addToLog("Пупе не удалось сбежать!");
    setTimeout(enemyAttack, 1000);
  }
}

function moveToLocation(locationIndex) {
  if (game.gameOver) return;

  const currentLocation = game.locations[game.currentLocationIndex];
  const targetLocation = game.locations[locationIndex];

  if (game.currentEnemy) {
    addToLog(`Сначала нужно разобраться с ${game.currentEnemy.name}!`);
    return;
  }

  if (locationIndex !== game.currentLocationIndex + 1) {
    addToLog("Нужно идти последовательно через локации!");
    return;
  }

  elements.enemyAttackText.textContent = "";
  elements.enemyAttackText.classList.remove("enemy-attack");

  game.currentLocationIndex = locationIndex;
  updateLocation();
  addToLog(`Пупа перемещается в ${targetLocation.name}.`);
}

function updateLocation() {
  const location = game.locations[game.currentLocationIndex];
  elements.locationName.textContent = location.name;
  elements.locationDescription.textContent = location.description;
  updateButtons();
  if (location.enemy && !game.currentEnemy) {
    startCombat(location.enemy);
  }
}

function gameOver() {
  game.gameOver = true;
  addToLog("Пупа проиграл и не получил зарплату! Игра окончена.");
  elements.combatActions.classList.add("hidden");
  elements.moveActions.classList.add("hidden");
}

function victory() {
  game.gameOver = true;
  elements.gameLog.innerHTML = "";
  addToLog(
    "Бухгалтерша: *роняет очки* Ой-ой-ой... Кажется, я ошиблась! Я перепутала и отдала вашу зарплату Лупе!"
  );
  addToLog("Пупа: *вздыхает* Опять придется получать за Лупу");
  addToLog("Игра окончена. Пупа победил (или нет?...)");
  elements.combatActions.classList.add("hidden");
  elements.moveActions.classList.add("hidden");
}

function addToLog(message) {
  const logEntry = document.createElement("p");
  logEntry.textContent = message;
  elements.gameLog.appendChild(logEntry);
  elements.gameLog.scrollTop = elements.gameLog.scrollHeight;
}

function resetGame() {
  game.player.health = 100;
  game.player.maxHealth = 100;
  game.player.level = 1;
  game.player.experience = 0;
  game.player.nextLevelExp = 100;
  game.player.inventory = ["Кофе", "Бутерброд"];
  game.player.baseAttack = 10;
  game.currentLocationIndex = 0;
  game.currentEnemy = null;
  game.gameOver = false;
  elements.gameLog.innerHTML = "";
  updatePlayerStats();
  updateLocation();
  endCombat();
  addToLog("Игра сброшена. Пупа снова отправляется за зарплатой!");
}

function setupEventListeners() {
  elements.moveButtons[0].addEventListener("click", () => moveToLocation(1));
  elements.moveButtons[1].addEventListener("click", () => moveToLocation(2));
  elements.moveButtons[2].addEventListener("click", () => moveToLocation(3));
  elements.attackBtn.addEventListener("click", playerAttack);
  elements.useItemBtn.addEventListener("click", useItem);
  elements.runBtn.addEventListener("click", tryRun);
  elements.resetBtn.addEventListener("click", resetGame);
}

window.onload = initGame;
