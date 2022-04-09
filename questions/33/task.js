const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Что эта программа выведет на экран?"
    var photo = "photo-205320016_457239087"
    var hard = 6
    var right_answer = 123
    var explanetion = `Переменная x = 123 объявлена внутри блока if, поэтому это не является синтаксической ошибкой. Внутри if x со значением 123 "перекрывает" переменную x со значением 5. Поэтому на экран будет выведено число 123.

    На практике так, конечно же, делать не нужно! Но иногда это получается случайно и надо знать и понимать возможные причины странного поведения программы`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `выведется ошибка`
        }),
        Keyboard.textButton({
            label: `ничего не выведет`
        }),
        Keyboard.textButton({
            label: `5`
        }),Keyboard.textButton({
            label: `123`
        }),
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
                        context.send({ message: `${phrases_minus[random_minus]}\n\n${explanetion}`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }  
}

lol()