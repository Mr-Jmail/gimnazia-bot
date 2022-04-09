const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Что программа выведет на экран?(Не учитывая вывод с новой строки и автопробел)"
    var photo = "photo-205320016_457239050"
    var hard = 3
    var right_answer = 2
    var explanetion = `Условие не выполняется так как 'F' не равно 'f'. Поэтому единица не будет напечатана. Двойка же будет напечатана так как она не относится к условию`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `4`
        }),
        Keyboard.textButton({
            label: `1`
        }),
        Keyboard.textButton({
            label: `2`
        }),
        Keyboard.textButton({
            label: `12`
        }),Keyboard.textButton({
            label: `Ничего`
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