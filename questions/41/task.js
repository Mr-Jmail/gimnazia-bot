const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Где можно объявлять переменные в языке Python?"
    var hard = 2
    var right_answer = "в любом месте программы"
    var explanetion = `В языке python переменные можно объявлять практически в любом месте. Нет никакой необходимости объявлять их все в начале программы, как в языке Pascal. Более того, в python рекомендуется объявлять переменные непосредственно перед их использованием (рядом с местом их использования). Просто потому что это удобно!`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `только в начале программы`
        }),
        Keyboard.textButton({
            label: `в любом месте программы`
        })
    ])

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, keyboard: keyboardd})
    
    
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