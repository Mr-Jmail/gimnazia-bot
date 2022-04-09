const { Keyboard } = require("vk-io")

async function lol(){
    var question = "Выберите верное утверждение о переменных x и y:"
    var photo = "photo-205320016_457239089"
    var hard = 5
    var right_answer = "x - глобальная, y - локальная"
    var explanetion = `Переменные, объявленные внутри функций называются локальными.

    Переменные объявленные вне функций и других блоков называются глобальными. 
    
    В данном случае x - это глобальная переменная, а y - локальная так как она объявлена внутри функции func.`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    var keyboardd = Keyboard.keyboard([
        Keyboard.textButton({
            label: `x, y - локальные переменные`
        }),
        Keyboard.textButton({
            label: `x - локальная, y - глобальная`
        }),
        Keyboard.textButton({
            label: `x - глобальная, y - локальная`
        }),
        Keyboard.textButton({
            label: `x, y - глобальные переменные`
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
                        context.send({ message: `${phrases_minus[random_minus]}\n\n${explanetion}`, keyboard: continuetion})
                        context.send({ message: `Сейчас у тебя ${res[0].Points}🌟\nПродолжаем проходить квест?`, keyboard: continuetion})
                    }
                })
            }
        })
    }  
}

lol()