//class spaceship and methods
class Spaceship {
    constructor(name, hull, firepower, accuracy) {
      this.name = name;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
  
    attack(target) {
      if (Math.random() < this.accuracy) {
        target.hull -= this.firepower;
        console.log(`You attacked the ${target.name}! ${target.name} hull: ${target.hull}`);
      return true;
    } else {
      console.log(`You missed the ${target.name}!`);
        return false;
      }
    }
  
    checkDestroyed() {
      return this.hull <= 0;
    }
  }
  //class alienship
  class AlienMegaShip {
    constructor() {
      this.name = "Alien Mega-Ship";
      this.hull = 50; // Main ship's hit points
      this.weaponPods = [
        { name: "Weapon Pod 1", hull: 10 },
        { name: "Weapon Pod 2", hull: 10 },
        { name: "Weapon Pod 3", hull: 10 }
        
      ];
    }
  
    isWeaponPodsDestroyed() {
      return this.weaponPods.every(weaponPod => weaponPod.hull <= 0);
    }
  }
  class AlienShip extends Spaceship {
    constructor() {
      super("Alien Ship", Math.floor(Math.random() * 4) + 3, Math.floor(Math.random() * 3) + 2, Math.random() * 0.2 + 0.6);
    }
  }
  
  class Player extends Spaceship {
    constructor() {
      super("USS Assembly", 20, 5, 0.7);
      this.missiles = 3;
      
    }
    
  }
  //class game and methods
  class Game {
    constructor() {
        this.playerShip = new Player();
        this.alienShips = []; // Array to hold alien ships
        this.isPlayerTurn = true;
        this.points = 0;
        this.currentAlienIndex = 0;
    }
  
    createAlienShips() {
      const numShips = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Generates between 5 and 10 alien ships
      for (let i = 0; i < numShips; i++) {
        this.alienShips.push(new AlienShip());
      }
    }
  
    getPlayerAction() {
      const action = prompt("Attack or Retreat");
  if (action !== null) {
    const lowercaseAction = action.toLowerCase();
    return lowercaseAction;
  } else {
    return "retreat";
  }
  }

  
  playerAttack(targetIndex) {
    const target = this.alienShips[targetIndex];
    if (Math.random() < this.playerShip.accuracy) {
      const hitPoints = this.playerShip.firepower;
      const remainingHull = target.hull - hitPoints;
      if (remainingHull > 0) {
        target.hull = remainingHull;
        console.log(`You attacked ${target.name}! ${target.name} hull: ${target.hull}`);
      } else {
        console.log(`You destroyed ${target.name}!`);
        this.alienShips.splice(targetIndex, 1);
      }
    } else {
      console.log("You missed the attack!");
    }
    this.enemyAttack(); // Enemy attacks back after surviving the player's attack
    this.checkGameStatus();
  }
  playAttack(targetIndex) {
    if (this.isPlayerTurn) {
      const target = this.alienShips[targetIndex];
      if (target instanceof AlienMegaShip) {
        this.attackWeaponPods(target);
      } else if (target instanceof AlienShip) {
        this.playerAttack(targetIndex);
      }
    } 
  }

    
enemyAttack() {
   const alienShip = this.alienShips[this.currentAlienIndex];
    if (Math.random() < alienShip.accuracy) {    // Check if the attack is successful based on alien ship's accuracy
      
      this.playerShip.hull -= alienShip.firepower;
      console.log(`The enemy attacked your ship! Your hull: ${this.playerShip.hull}`);
      if (this.playerShip.checkDestroyed()) {
        console.log("Your ship has been destroyed. Game over!");   // (This is where you can end the game or handle further actions)
       
      }
    } else {
      console.log("The ${alienShip.name} missed you!");
    }
    this.currentAlienIndex++;
    if (this.currentAlienIndex >= this.alienShips.length) {  // Reset the currentAlienIndex to 0 if all alien ships have attacked
      
      this.currentAlienIndex = 0;
      this.isPlayerTurn = true;  // Set it to player's turn after all alien ships attack
    }
}


checkGameStatus() {
    if (this.playerShip.checkDestroyed()) {
      console.log("Your ship has been destroyed. Game over!");
     
    } else if (this.alienShips.length === 0) {
      console.log(`Congratulations! You destroyed all the alien ships and won the battle! Points: ${this.points}`);
      this.points++;
      this.beforeBattle();
      this.rechargeShields();
      this.distributeMedalsAndPowerUps();
      this.createAlienShips(); // Respawn the alien ships for the next battle
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = !this.isPlayerTurn;
      console.log("It's the other player's turn!");
    }
  }



    beforeBattle() {
     
      const increaseHP = Math.floor(Math.random() * 5) + 1;
      this.playerShip.hull += increaseHP;
      console.log(`%cYour ship's shields have improved by ${increaseHP} points. Current hull: ${this.playerShip.hull}`, 'font-weight: bold; color: #28a745;');
    }
  
    rechargeShields() {
      const recharge = window.confirm("%cDo you want to return to base and recharge your shields?", 'font-weight: bold; color: #007bff;');
      if (recharge) {
        this.playerShip.hull = 20; // Fully recharge shields
        console.log("%cYour ship's shields have been fully recharged!", 'font-weight: bold; color: #28a745;');
      }
    }
  
    distributeMedalsAndPowerUps() {
      if (this.points >= 5) {
        console.log("%cCongratulations! You earned the Medal of Valor!", 'font-weight: bold; color: #ffc107;');   // Distribute power-ups or additional benefits here
       
      }
      if (this.points >= 10) {
        console.log("%cYou are promoted to Captain!", 'font-weight: bold; color: #ffc107;');  // Distribute more power-ups or benefits here
        
      }
    
    }
  
    respawnAliens() {
    this.currentAlienIndex = 0;
    this.alienShips = [];
    this.createAlienShips();
    }
  
    retreat() {
        console.log("%cYou choose Retreat , GAME OVER ", 'font-weight: bold; color: RED;');
        
      }

      checkGameOver() {
        return this.playerShip.checkDestroyed() || this.alienShips.every(alienShip => alienShip.checkDestroyed());
      }

  
    playAgain() {
      const playAgain = window.confirm("Do you want to play again?");
      if (playAgain) {
        this.playerShip = new Player();
        this.alienShips = [];
        this.currentAlienIndex = 0;
        this.isPlayerTurn = true;
        this.points = 0;
        this.startGame();
      } else {
        console.log("Thank you for playing! See you next time.", 'font-weight: bold; color: #007bff;');
      }
    }

        startGame() {
        console.log("Welcome to Space Battle!");
        this.respawnAliens();
       
        while (!this.playerShip.checkDestroyed()) {
        console.log(`Battle ${this.points + 1} begins!`);
    
          // Main battle loop
          while (!this.checkGameOver()) {
            if (this.isPlayerTurn) {
              console.log("Your Turn:");
              const action = this.getPlayerAction();
              if (action === "attack") {
                const targetIndex = prompt("Enter the index of the alien ship you want to attack (0 to N-1):");
                if (targetIndex !== null && !isNaN(targetIndex)) {
                  const index = parseInt(targetIndex);
                  if (index >= 0 && index < this.alienShips.length) {
                    this.playerAttack(index);
                  } else {
                    console.log("Invalid alien ship index. Try again.");
                  }
                } else {
                  console.log("Invalid input. Try again.");
                }
              } else if (action === "retreat") {
                this.retreat();
                break;
              } else {
                console.log("Invalid action. Try again.");
              }
            } else {
              console.log("Alien Turn:");
              this.enemyAttack();
            }
            this.points++; // Increment the points after a battle ends

            // Rewards and next battle setup after each battle
            console.log(`Congratulations! You destroyed all the alien ships and won the battle! Points: ${this.points}`);
            this.beforeBattle();
            this.rechargeShields();
            this.distributeMedalsAndPowerUps();
            this.respawnAliens();
            this.checkGameStatus();
          }
        }
    
        this.playAgain();
      }

}
  
  // Create the game instance and start the game when the button is clicked.
  const btnStartGame = document.getElementById("start-game-btn");
  btnStartGame.addEventListener("click", () => {
  const game = new Game();
  game.startGame();
  });
  

//..............................END...............................//


