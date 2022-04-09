async function lol(){
    var question = "Что выведет на экран эта программа (Не учитывая вывод с новой строки и автопробел)?"
    var photo = "photo-205320016_457239129"
    var hard = 7
    var right_answer = 324
    var explanetion = `В цикле перебираем индексы от 0 до 5 включительно. Если индекс четный (i%2 == 0), то выводим на экран соответствующий элемент массива.

    Будут напечатаны значения a[0], a[2], a[4], то есть получим 324.`
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