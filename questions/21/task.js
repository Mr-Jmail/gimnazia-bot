async function lol(){
    var question = "Сколько звездочек напечатает программа?"
    var photo = "photo-205320016_457239072"
    var hard = 10
    var right_answer = 4
    var explanetion = `Функция f() напечатает 1 звездочку. Функция g() внутри себя вызовет функцию f, а значит тоже печатает 1 звездочку.

    Функция h() вызывает функцию f и g, то есть печатает 2 звездочки. 
    
    Затем мы вызываем функции f, g и h, то есть печатает 1 + 1 + 2 == 4 звездочки`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo})

    
    if (/4|four|четыре/i.test(task.text)) {
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