const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Программа должна вывести на экран все элементы массива A через пробел. Что необходимо вставить в пропуски:"
    var photo = "photo-205320016_457239064"
    var hard = 4
    var right_answer = "0 и 5"
    var explanetion = `Массив A содержит 5 элементов:

a[0] a[1] a[2] a[3] a[4]

Счетчик i должен "перебрать" значения от 0 до 4 включительно. Это можно записать так:

for i in range(0, 5, +1)`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `1 и 4`
        }),
        Keyboard.textButton({
            label: `1 и 5`
        }),
        Keyboard.textButton({
            label: `0 и 4`
        }),
        Keyboard.textButton({
            label: `0 и 5`
        })
    ])

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo, keyboard: keyboardd})
    
    
    if(task.text == right_answer) {
        var plus = "UPDATE `project` SET `tasks` = tasks + 1, Solved_Tasks = Solved_Tasks + 1, Points = Points + " + hard + " WHERE `Vk_ID` = "+ context.senderId
        conn.query(plus, (err, res) => {
            if(err) {
                console.log(err)
            }
            else {
                conn.query(amount, (err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        context.send({ message: `${phrases_plus[random_plus]}\nЛови ${hard}🌟`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }
    else {
        var minus = "UPDATE `project` SET `tasks` = tasks + 1, Points = Points - 1 WHERE `Vk_ID` = "+ context.senderId
        conn.query(minus, (err, res) => {
            if(err) {
                console.log(err)
            }
            else {
                conn.query(amount, (err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        context.send({ message: `${phrases_minus[random_minus]}\n\n${explanetion}`, attachment: "photo-205320016_457239065", keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }  
}

lol()