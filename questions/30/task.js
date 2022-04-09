const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Эта программа ..."
    var photo = "photo-205320016_457239083"
    var hard = 5
    var right_answer = "ничего не выведет"
    var explanetion = `В данной программе объявлена функция f(), которая выводит на экран символ 'f', но эта функция ни разу не вызвана. Чтобы вызывать функцию необходимо после ее имени записать пустые круглые скобки. Без них вызова функции не произойдет!

    При этом имя функции не запрещено использовать в коде программы и без круглых скобок. Более того, иногда это необходимо. Поэтому ошибок не будет.`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `ошибку`
        }),
        Keyboard.textButton({
            label: `ничего не выведет`
        }),
        Keyboard.textButton({
            label: `напечатает f`
        }),
        Keyboard.textButton({
            label: `напечатает ff`
        })
    ])

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo, keyboard: keyboardd})
    
    
    if (/ничего не выведет/i.test(task.text)) {
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
                        context.send({ message: `${phrases_minus[random_minus]}\n\n${explanetion}`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }  
}

lol()