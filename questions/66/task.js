async function lol(){
    var question = "Что выведет на экран эта программа?"
    var photo = "photo-205320016_457239130"
    var hard = 2
    var right_answer = "(1 + 2) * 3"
    var explanetion = `Так как это выражение записано в двойных кавычках, то это строка. Строка будет выведена в том же виде в котором она записана, только без кавычек. Поэтому выведется: (1 + 2) * 3`
    var amount = "SELECT * FROM project WHERE `Vk_ID` = " + context.senderId

    const task = await context.question({message: `Вопрос на ${hard}🌟\n${question}`, attachment: photo})
    
    
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