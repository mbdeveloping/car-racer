import {display} from './index';
import Car from './Car';
import Npc from './Npc';
import Road from './Road';

export default class World {
    constructor() {
        // this.randomAcceleration = 0.5,
        this.playerCar = new Car(80, display.height - 200, 60, 100, 'black'),
        this.spawnPos = [
            {isUsed: false, x: 0, y: -100},
            {isUsed: false, x: 70, y: -100},
            {isUsed: false, x: 170, y: -100},
            {isUsed: false, x: 240, y: -100}
        ],
        this.spawnCounter = 0,
        this.npcCars = ["red", "green", "yellow"],
        this.npc = [],
        this.levelData = [
            {cars: 2, speed: 7},
            {cars: 3, speed: 7}
        ],
        this.level = 1,
        this.road = new Road(display, this.levelData[this.level].speed),
        this.frameCounter = 0
    }

    createNpc(counter) {
        if (this.npc.length < this.levelData[this.level].cars) {
            let randomPos = Math.floor(Math.random() * (this.spawnPos.length));
            counter = randomPos;

            if (this.spawnPos[counter].isUsed === false) {
                this.spawnPos[randomPos].isUsed = true;

                this.npc.push(new Car(
                    this.spawnPos[randomPos].x,
                    this.spawnPos[0].y,
                    60,
                    100,
                    this.npcCars[Math.floor(Math.random() * (this.npcCars.length - 1))],
                    counter
                ));
            } else {
                if (counter === this.spawnPos.length - 1) {
                    this.createNpc(0);
                } else {
                    this.createNpc(counter + 1);
                }
            }
            

            
            

            // if (this.spawnPos[randomPos].isUsed === false) {
            //     this.spawnPos[randomPos].isUsed = true;
            //     // this.spawnCounter = randomPos;

            //     // console.log('if');
            //     // console.log(randomPos);
            //     // console.log(this.spawnCounter);

            //     this.npc.push(new Car(
            //         this.spawnPos[randomPos].x,
            //         this.spawnPos[0].y,
            //         60,
            //         100,
            //         this.npcCars[Math.floor(Math.random() * (this.npcCars.length - 1))],
            //         this.spawnCounter
            //     ));
            // } else {
            //     if (this.spawnCounter === this.spawnPos.length - 1) {
            //         this.spawnCounter = 0;
            //         console.log('l-1');
            //     } else {
            //         if (this.spawnPos[this.spawnCounter].isUsed === true) {
            //             console.log('else else in');
            //             this.spawnCounter += 1;
            //         }

            //         console.log('else else out');
            //     }

            //     this.spawnPos[this.spawnCounter].isUsed = true;
            //     console.log(this.spawnCounter);

            //     this.npc.push(new Car(
            //         this.spawnPos[this.spawnCounter].x,
            //         this.spawnPos[0].y,
            //         60,
            //         100,
            //         this.npcCars[Math.floor(Math.random() * (this.npcCars.length - 1))],
            //         this.spawnCounter
            //     ));
            // }
        }
    }

    showNpc() {
        for (let i = 0; i < this.npc.length; i++) {
            this.npc[i].show();
        }
    }

    moveNpc() {
        // this.npc[0].pos.y += this.levelData[this.level].speed * 0.5;

        // if (this.npc.length > 1) {
        //     if (this.frameCounter > 0) {
        //         if (this.npc[1].acc === 0) {
        //             this.npc[1].acc = Math.random().toFixed(1);
        //         }
        //         this.npc[1].pos.y += this.levelData[this.level].speed * this.npc[1].acc;
        //     }
        // }

        for (let i = 0; i < this.npc.length; i++) {
            
            if (this.npc[i].acc === 0 || this.npc[i].acc === '0.0') {
                this.npc[i].acc = Math.random().toFixed(1);
            }
            this.npc[i].pos.y += this.levelData[this.level].speed * this.npc[i].acc;;
        }
    }

    restoreNpc() {
        for (let i = 0; i < this.npc.length; i++) {
            if (this.npc[i].pos.y >= display.height) {
                // this.npc[i].pos.y = this.spawnPos[0].y; //all has same spawn pos
                // this.npc[i].pos.x = this.spawnPos[Math.floor(Math.random() * (this.spawnPos.length - 1))].x;
                // this.npc[i].acc = 0; //restore acc
                // console.log(this.npc);
                this.spawnPos[this.npc[i].spawnPos].isUsed = false;
                this.npc.splice(i, 1);
            }
        }
    }

    updatePlayerPos() {
        this.playerCar.pos.x += this.playerCar.xDir;
    }

    collideObject() {
        if (this.playerCar.pos.x < 0) {
            this.playerCar.pos.x = 0;
        } else if (this.playerCar.pos.x + this.playerCar.width >= display.width) {
            this.playerCar.pos.x = display.width - this.playerCar.width;
        }
    }

    countFrame() {
        this.frameCounter++;
    }

    update() {
        this.road.moveLines();
        this.road.restoreLines();
        this.updatePlayerPos();
        this.collideObject();
        this.createNpc(this.spawnCounter);
        this.moveNpc();
        this.restoreNpc();
        this.countFrame();
    }

    show() {
        this.road.createRoad();
        this.road.createLines();
        this.playerCar.show();
        this.showNpc();
        // console.log(this.npc);
        // console.log(this.frameCounter);
    }
}