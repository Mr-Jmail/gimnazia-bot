require('dotenv').config()
const fs = require('fs')
const { VK, Keyboard, MessageContext, Context, VKAppPayloadContext, API } = require('vk-io')
const vk = new VK({ token: process.env.BOT_TOKEN})
const { HearManager } = require('@vk-io/hear')
const hearManager = new HearManager()
const { QuestionManager } = require('vk-io-question')
const questionManager = new QuestionManager()
const mysql = require('mysql')
const conn = mysql.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE, connectionLimit: 7})
vk.updates.use(questionManager.middleware) 
vk.updates.on('message_new', hearManager.middleware)


hearManager.hear(/^Начать|Привет|hello|Hi|хэлло|хай|start|старт/i, async(context) => {
        var exists = "UPDATE `project` SET `search` = '1' WHERE `Vk_ID` = "+ context.senderId
        const link = `https://www.vk.com/id${context.senderId}`
    
         conn.query(exists, (err, res) => {
         if(err) {
             console.log(err)
         }
         else if(res.message[15] == 1) {
            context.send({message: `Привет, друг я - Бот, который поможет тебе попрактиковаться в решении простых заданий на языке Python\nВыбери следующее действие👇🏻`, keyboard: choise})
        }
         else if(res.message[15] == 0) {
            context.send({message: `Привет, друг я - Бот, который поможет тебе попрактиковаться в решении простых заданий на языке Python\nВыбери следующее действие👇🏻`, keyboard: choise})
            var code = "INSERT INTO `project` (`ID`, `Vk_ID`, `Vk_Link`) VALUES (NULL, "+ context.senderId + ", '" + link + "')"
             conn.query(code, (err)=> {
                 if(err) {
                     console.log(err)
                }
             })
         }
       })
})

const choise = Keyboard.keyboard([
	[
        Keyboard.textButton({
			label: `Решить квизы`,
			color: "primary",
            payload: "Python"
        }),
        Keyboard.textButton({
            label: `Посмотреть профиль`,
            color: "positive"
        })
    ]
])	
.oneTime()


hearManager.hear(/^Посмотреть профиль/i, async(context) => {
    var qwiz = `SELECT * FROM project WHERE Vk_ID = ${context.senderId}`
    conn.query(qwiz, (err, res)=> {
        if(err) {
            console.log(err)
        }
        else {
            if(res[0].Tasks != 0) {
                const percent = res[0].Solved_Tasks / res[0].Tasks * 100
                context.send({message: `У тебя ${res[0].Points}🌟\nТы ответил на ${res[0].Tasks} вопросов\nТы правильно ответил на ${res[0].Solved_Tasks}\nПроцент правильно решенных задач: ${percent.toFixed(2)}`, keyboard: back})
            }
            else
                context.send({message: `У тебя ${res[0].Points}🌟\nТы ответил на ${res[0].Tasks} вопросов\nТы правильно ответил на ${res[0].Solved_Tasks}\nПроцент правильно решенных задач: 0`, keyboard: back})
        }
    })
})


const back = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Назад`,
            color: "negative",
            payload: "Back to menu"
        })
    ]
])


hearManager.hear(/^Решить квизы|Давай продолжим/i, async(context) => {
    //Начало рандомайзера без повтора
    let numbersArray = createArrayOfNumbers(1,71); //Создание массива с числами
    if(numbersArray.length == 0){
        numbersArray = createArrayOfNumbers(1,71);  //Повторное заполнение массива
    } 
    let randomIndex = getRandomNumber(0, numbersArray.length-1); //Выбор индекса
    let number = numbersArray[randomIndex]; //Выбор числа из массива
    numbersArray.splice(randomIndex, 1) //Удаление выбранного числа из массива
    //Конец рандомайзера без повтора
    function run(file) {
        fs.readFile(file, (err, data) => {
            if(err) 
            console.log(err)
            else
            eval(data.toString('utf8'))
        })
        let random_plus = randomIntFromInterval(0, phrases_plus.length - 1)
        let random_minus = randomIntFromInterval(0, phrases_minus.length - 1)
    }
    run(`./questions/${number}/task.js`)
})


const continuetion = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Давай продолжим`,
            color: "positive",
            payload: "Python"
        }),
        Keyboard.textButton({
            label: `Давай остановимся`,
            color: "negative"
        })
    ]
])
.oneTime()


hearManager.hear(/^Давай остановимся|Stop/i, async(context) => {
    var qwiz = `SELECT * FROM project WHERE Vk_ID = ${context.senderId}`
    conn.query(qwiz, (err, res)=> {
        if(err) {
            console.log(err)
        }
        else
            context.send({message: `Квиз остановлен\nСейчас у тебя ${res[0].Points}🌟`})
            context.send({message: `До скорой встречи!`, keyboard: choise})
    })
})


// Фразы для плюса
let phrases_plus = ["Ты лучший!", "Круто!", "Ты молодец!", "Хорошо постарался!", "Настоящий программист!", "Поймал волну!", "Потрясающе!", "Успех!", "Молодец, блеснул умом!", "Как всегда верно!", "Безошибочно!", "Ты слишком умён!", "Просто феноменально!", "Превосходно", "Вне всяких похвал", "У тебя вышло!", "Просто потрясающе", "Браво!", "Сенсационно!", "Фантастика!", "Ты сделал это!", "Снимаю шляпу"]

//Фразы для минуса
let phrases_minus = ["Эх, неверно", "Вообще-то нет"]


//Функция для рандома
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Функции для рандома без повтора
function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function createArrayOfNumbers(start, end){
    let myArray = [];
    for(let i = start; i <= end; i++) { 
        myArray.push(i);
    }
    return myArray;
}
//Конец функций для рандома без повтора

hearManager.hear(/^Назад/i, async(context) => {
    if(context.messagePayload == "Back to menu") {
        context.send({message: `Привет, друг я - Бот, который поможет тебе попрактиковаться в решении простых заданий на языке Python\nВыбери следующее действие👇🏻`, keyboard: choise})
    }
})

async function run() {
    await vk.updates.start();
    console.log("LESSSS GOOOOOOOOOOOO");
}

run().catch(console.error);